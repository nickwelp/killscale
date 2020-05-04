import React, { ChangeEvent, useContext, useState } from 'react';

import { attackers } from '../models/units';
import AddAttacker from './InputInterfaces/AddAttacker';
import AddWeapon from './InputInterfaces/AddWeapon';

import { MyUserContext } from '../controllers/context/UserContext';
import { IUnit, IWeaponProfile } from '../models/interfaces';

const SelectAttackers = () => {
    const [showDefaultAttackers, updateShowDefaultAttackers] = useState(false);
    const {
        userCreatedAttackers,
        userCreatedWeaponProfiles,
        activeAttackersList,
        setActiveAttackersList,
        showSelectAttackers,
        setShowSelectAttackers } = useContext(MyUserContext);

    const listOfUserCreatedWeapons = (userCreatedWeaponProfiles: IWeaponProfile[]) => {
        return userCreatedWeaponProfiles.map(({ name }: IWeaponProfile, i: number) => {
            return (<span key={i}>{name}, </span>);
        });
    };
    const defaultAttackersLength = attackers.length;
    const options = (attackers: IUnit[]) => attackers.map((shooter, i) => {
        let style = {};
        if (!showDefaultAttackers && i < defaultAttackersLength) {
            style = { display: 'none' };
        }
        return (
            <li key={i} style={style}>
                <label>
                    <input type={'checkbox'} name={'shooterSelection'} value={i} checked={activeAttackersList.includes(i)} onChange={setActiveAttackersList} />
                    {shooter.name}
                </label>
            </li>
        );
    });
    return (
        <div style={{ background: '#F2F2F2', marginBottom: '10px' }}>
            <div style={{ background: '#F2F2F2', padding: '2px 2px 10px 10px', marginBottom: '0', display: 'flex', flexFlow: 'row', justifyContent: 'space-between' }}>
                <h2>Select Attackers </h2>
                <label>close Attackers<input checked={showSelectAttackers} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowSelectAttackers(!!e.currentTarget.checked)} /></label>
            </div>
            <label style={{ margin: 'auto', width: '90%', display: 'block' }} >Show Default Space Marine Attackers <input checked={showDefaultAttackers} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => updateShowDefaultAttackers(!!e.currentTarget.checked)} /> </label>
            <ul style={{ listStyleType: 'none', fontSize: 'small', display: 'flex', flexFlow: 'column wrap', margin: 'auto', columnCount: 2, columnGap: '20px', height: '200px', padding: '10px' }}>
                {options([...attackers, ...userCreatedAttackers])}
            </ul>
            <div style={{ padding: '10px' }}>
                <p>
                    <small>
                        {listOfUserCreatedWeapons(userCreatedWeaponProfiles)}
                    </small>
                </p>
                <div style={{ textAlign: 'center' }}>
                    <AddWeapon />
                    <AddAttacker />
                </div>
            </div>

        </div>
    );
};

export default SelectAttackers;
