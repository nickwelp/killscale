import React, { SyntheticEvent, useReducer, useState, ChangeEvent, useContext } from 'react';


import { ITarget, IUnit } from '../models/interfaces';
import TargetManagement from './TargetManagement';
import { MyUserContext } from '../controllers/context/UserContext';


interface IProps {
    shooter: IUnit;
    targets: ITarget[];
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
    hideProfile }: IProps) => {
    const { uiSettings } = useContext(MyUserContext);
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
    const [localPoints, updateLocalPoints] = useState(shooter.points);

    if (hideProfile) return null;
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
                            id={'weapon_' + shooter.name.replace(' ', '-') + '_' + index}
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

    const shootingProfiles = targets.map((target, i) => {
        return <TargetManagement
            key={i}
            shooter={{ ...shooter, points: localPoints }}
            weapons={submittedWeapons}
            targets={[target]}
            modelCount={modelCount}
            shotsFired={submittedShotsFired}

        />;

    });

    return (
        <div key={shooter.name.replace(' ', '_')} style={{ width: '400px', maxWidth: '100%', margin: '5px', boxShadow: '0px 0px 1px rgba(0,0,0,.1)', fontSize: '12px', background: '#F2F2F2', padding: '10px' }}>

            <div style={{ display: 'table-row' }}>
                <label style={{ display: 'table-cell', marginRight: '15px', position: 'relative', top: '-17px' }}>
                    <span style={{ display: 'flex', flexFlow: 'column nowrap', textAlign: 'right' }}>
                        <span style={{ fontSize: '9px' }}>Points per</span>
                        <select defaultValue={localPoints.toString()} onChange={(e: ChangeEvent<HTMLSelectElement>) => updateLocalPoints(parseInt(e.currentTarget.value, 10))}>
                            {options(600)}
                        </select>
                    </span>
                </label>
                <select defaultValue={'1'} style={{ margin: '5px', display: 'table-cell' }} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateModelCount(parseInt(e.currentTarget.value))}>
                    {options()}
                </select>
                <h5 style={{ display: 'table-cell', width: '100%' }}>{shooter.name}</h5>
            </div>
            <div style={{ textAlign: 'center' }}>
                <ul style={{ listStyleType: 'none', textAlign: 'right', padding: 0, marginLeft: '30px' }}>{weaponProfiles}</ul>
                {shootingProfiles}
            </div>

        </div>

    );

};

export default ShootingProfile;