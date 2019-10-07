import React, { useReducer, useState } from 'react';

import { processSet } from '../controllers/processSet';
import { IDoctrine, ITarget, IUnit, IRerollSet } from '../models/interfaces';

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

const ShootingProfile = ({ shooter, targets, sumWounds, rerollProfile, doctrine, uiSettings, hideProfile }: IProps) => {

    const { weapons } = shooter;

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

    const weaponProfiles = weapons.map((weapon, index) => {
        if (uiSettings.hideUncheckedWeapons && uiSettings.hideUncheckedWeapons && !state.includes(index)) {
            return (<></>);
        }
        return (
            <li key={index}>{weapon.name} w/ {weapon.numberOfShotsLabel} shots <input type={'checkbox'} value={index} checked={state.includes(index)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch({ element: e.currentTarget })} /> </li>
        );
    });
    const submittedWeapons = weapons.filter((_, i) => state.includes(i));
    const dataSet = processSet({ shooter, weapons: submittedWeapons, targets, sumWounds, modelCount, rerollProfile, doctrine });
    const numbers = Array(100).fill('');
    const options = numbers.map((_, i) => {
        return (
            <option key={i} selected={i === 1} value={i}>{i}</option>
        );
    });
    if (hideProfile) return (
        <></>
    );
    const shootingProfiles = dataSet.map((data: any, i: number) =>
        (
            <div style={{ fontSize: '15px' }} key={i}>
                <small>{data.target}</small><br />
                <small>{data.pruned.worst}</small> - {data.pruned.lowerMedian} - <strong>{data.pruned.median}</strong> - {data.pruned.upperMedian} - <small>{data.pruned.best}</small><br />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <small style={{ margin: '3px', flexGrow: 1 }}>{(Math.round((shooter.points * modelCount / data.mean) * 100) / 100)}<br /> <span style={{ fontSize: '9px' }}>Points Per Mean</span></small><br />
                    <small style={{ margin: '3px', flexGrow: 1 }}>{(Math.round(100 * data.standardDeviation) / 100)} <br /><span style={{ fontSize: '9px' }}>Variance</span></small>
                </div>
            </div>
        ));

    return (
        <div key={shooter.name} style={{ maxWidth: '450px', textAlign: 'center', margin: '5px', boxShadow: '0px 0px 1px rgba(0,0,0,.1)', fontSize: '12px' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateModelCount(parseInt(e.currentTarget.value))}>
                    {options}
                </select>
                <h4>{shooter.name}</h4>
            </div>

            <div style={{ margin: '0 20px 0 0' }}>
                <ul style={{ listStyleType: 'none', textAlign: 'right' }}>{weaponProfiles}</ul>
                {shootingProfiles}
            </div>
        </div>
    );

};

export default ShootingProfile;