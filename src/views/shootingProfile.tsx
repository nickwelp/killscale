import React, { ChangeEvent, SyntheticEvent, useReducer, useState } from 'react';

import CreateSet from '../controllers/Shooting';
import { IDoctrine, IRerollSet, ITarget, IUnit } from '../models/interfaces';
import KillScale from './KillScale';

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

const options = (count: number = 100) => {
    return Array(count).fill('').map((_, i) => {
        return (
            <option key={i} value={i}>{i}</option>
        );
    });
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

    const [shotsFired, updateShotsFired] = useState(
        weapons.map((_, index) => state.includes(index) ? 1 : 0)
    );

    const [modelCount, updateModelCount] = useState(1);

    weapons.forEach((weapon, index) => {
        weapon.shotsFiredMultiplier = state.includes(index) ? 1 : 0;
    });
    const weaponProfiles = weapons
        .map((weapon, index) => {
            return (
                <li key={index} style={{ display: 'table-row', flexFlow: 'row nowrap', textAlign: 'left' }} >
                    <select
                        aria-label={'Count of the number of weapons of the following'}
                        style={{ display: 'table-cell', zIndex: 9, position: 'relative', fontSize: '10px' }}
                        name={'shotsFiredMultiplier-' + index}
                        id={'shotsFiredMultiplier-' + index}
                        onChange={(e: SyntheticEvent<HTMLSelectElement>) => {
                            const { id, value } = e.currentTarget;
                            const index = parseInt(id.split('-')[1], 10);
                            const newShotsFired = [...shotsFired];
                            newShotsFired[index] = parseInt(value, 10);
                            // @ts-ignore
                            updateShotsFired([...newShotsFired]);
                        }}
                        defaultValue={weapon.shotsFiredMultiplier + ''}>
                        {options(400)}
                    </select>
                    <span style={{ display: 'table-cell', }}>
                        <input
                            type={'checkbox'}
                            value={index}
                            name={'weapon_' + shooter.name.replace(' ', '-') + '_' + index}
                            checked={state.includes(index)}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch({ element: e.currentTarget })}
                            style={{ margin: '5px' }}
                        />
                    </span>
                    <label style={{ display: 'table-cell', }}
                        htmlFor={'weapon_' + shooter.name.replace(' ', '-') + '_' + index}
                    >
                        {weapon.name} ({weapon.numberOfShotsLabel} shots)
                    </label>
                </li>
            );
        })
        .filter((_, index) => state.includes(index) || !uiSettings.hideUncheckedWeapons);
    const submittedWeapons = weapons.filter((_, i) => state.includes(i));
    const submittedShotsFired = shotsFired.filter((_, i) => state.includes(i));

    const dataSet = CreateSet({
        shooter,
        weapons: submittedWeapons,
        targets,
        sumWounds,
        modelCount,
        rerollProfile,
        doctrine,
        iterations,
        shotsFired: submittedShotsFired
    });

    if (hideProfile) return null;
    const shootingProfiles = dataSet.map((data: any, i: number) => {
        return <KillScale key={i} data={data} i={i} shooter={shooter} modelCount={modelCount} />;
    }

    );

    return (
        <div key={shooter.name.replace(' ', '_')} style={{ width: '400px', maxWidth: '100%', margin: '5px', boxShadow: '0px 0px 1px rgba(0,0,0,.1)', fontSize: '12px' }}>
            <div style={{ display: 'table-row' }}>
                <select defaultValue={'1'} style={{ margin: '5px', display: 'table-cell' }} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateModelCount(parseInt(e.currentTarget.value))}>
                    {options()}
                </select>
                <h5 style={{ display: 'table-cell' }}>{shooter.name}</h5>
            </div>
            <div style={{ margin: '0 20px 0 0', textAlign: 'center' }}>
                <ul style={{ listStyleType: 'none', textAlign: 'right', padding: 0, marginLeft: '10px' }}>{weaponProfiles}</ul>
                {shootingProfiles}
            </div>

        </div>

    );

};

export default ShootingProfile;