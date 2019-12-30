import React, { useReducer, useState } from 'react';

import CreateSet from '../controllers/Shooting';
import { IDoctrine, IRerollSet, ITarget, IUnit } from '../models/interfaces';

import cx from 'classnames';
import bootstrap from '../views/theme/bootstrap.module.css';

interface IUISettings {
    [key: string]: boolean;
}

interface IProps {
    shooter: IUnit;
    targets: ITarget[];
    sumWounds: boolean;
    rerollProfile: IRerollSet;
    doctrine: IDoctrine;
    uiSettings: IUISettings;
    hideProfile: boolean;
    iterations: number;
}

interface IDispatch {
    element: HTMLInputElement;
}

const reducer = (state: number[], { element }: IDispatch) => {
    const newState = [...state];
    const identifier = element.value;
    if (element.checked) newState.push(parseInt(identifier));
    else return newState.filter((v) => v !== parseInt(identifier));
    return newState;
};

const ShootingProfile = ({
    shooter,
    targets,
    sumWounds,
    rerollProfile,
    doctrine,
    uiSettings,
    hideProfile,
    iterations = 3000 }: IProps) => {

    const { weapons = [] } = shooter;

    const weaponsUsed: number[] = [];
    const identifier: string[] = [];
    weapons.forEach((weapon, i) => {
        if (!weapon.tags.includes('multiprofile')) weaponsUsed.push(i);
        else {
            if (weapon.uniqueIdentifier && !identifier.includes(weapon.uniqueIdentifier)) {
                identifier.push(weapon.uniqueIdentifier);
                weaponsUsed.push(i);
            }
        }
    });

    const [state, dispatch] = useReducer(reducer, weaponsUsed);

    const [modelCount, updateModelCount] = useState(1);

    const weaponProfiles = weapons
        .map((weapon, index) => {
            return (
                <li key={index}>{weapon.name} w/ {weapon.numberOfShotsLabel} shots <input type={'checkbox'} value={index} checked={state.includes(index)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch({ element: e.currentTarget })} /> </li>
            );
        })
        .filter((_, index) => state.includes(index) || !uiSettings.hideUncheckedWeapons);
    const submittedWeapons = weapons.filter((_, i) => state.includes(i));
    const dataSet = CreateSet({
        shooter,
        weapons: submittedWeapons,
        targets,
        sumWounds,
        modelCount,
        rerollProfile,
        doctrine,
        iterations
    });
    const numbers = Array(100).fill('');
    const options = numbers.map((_, i) => {
        return (
            <option key={i} value={i}>{i}</option>
        );
    });
    if (hideProfile) return null;
    const shootingProfiles = dataSet.map((data: any, i: number) =>
        (
            <div style={{ fontSize: '15px' }} key={i}>
                <small>{data.target}</small><br />
                <small>{data.pruned.worst}</small> - {data.pruned.lowerMedian} - <strong>{data.pruned.median}</strong> - {data.pruned.upperMedian} - <small>{data.pruned.best}</small><br />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <small style={{ margin: '3px', flexGrow: 1 }}>{(Math.round((shooter.points * modelCount / data.mean) * 100) / 100)}<br /> <span style={{ fontSize: '9px' }}>ppm</span></small><br />
                    <small style={{ margin: '3px', flexGrow: 1 }}>{(Math.round(100 * data.standardDeviation) / 100)} <br /><span style={{ fontSize: '9px' }}>v</span></small>
                </div>
            </div>
        ));

    return (
        <div key={shooter.name.replace(' ', '_')} style={{ maxWidth: '450px', textAlign: 'center', margin: '5px', boxShadow: '0px 0px 1px rgba(0,0,0,.1)', fontSize: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <select defaultValue={'1'} style={{ margin: '5px' }} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateModelCount(parseInt(e.currentTarget.value))}>
                    {options}
                </select>
                <h5>{shooter.name}</h5>
            </div>

            <div style={{ margin: '0 20px 0 0', textAlign: 'center' }}>
                <ul style={{ listStyleType: 'none', textAlign: 'right' }}>{weaponProfiles}</ul>
                {shootingProfiles}
            </div>
        </div>

    );

};

export default ShootingProfile;