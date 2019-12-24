import React, { useContext, useState, ChangeEvent } from 'react';

import { attackers } from '../models/units';
import AddWeapon from './AddWeapon';
import AddAttacker from './AddAttacker';

import { MyUserContext } from '../controllers/context/UserContext';
import { IWeaponProfile, IUnit } from '../models/interfaces';
interface IProps {
    activeAttackersList: number[];
    setActiveAttackersList: any;
}

const SelectAttackers = ({ activeAttackersList, setActiveAttackersList }: IProps) => {
    const [showDefaultAttackers, updateShowDefaultAttackers] = useState(false);
    const { userCreatedAttackers, userCreatedWeaponProfiles, } = useContext(MyUserContext)

    const listOfUserCreatedWeapons = (userCreatedWeaponProfiles: IWeaponProfile[]) => {
        return userCreatedWeaponProfiles.map(({ name }: IWeaponProfile, i: number) => {
            return (<span key={i}>{name}, </span>);
        });
    }
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
        <>
            <label style={{ margin: 'auto', width: '90%', display: 'block' }} >Show Default Space Marine Attackers <input checked={showDefaultAttackers} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => updateShowDefaultAttackers(!!e.currentTarget.checked)} /> </label>
            <ul style={{ listStyleType: 'none', fontSize: 'small', display: 'flex', flexFlow: 'column wrap', width: '90%', borderRadius: '3px', boxShadow: '2px 2px 5px #999', margin: 'auto', columnCount: 2, columnGap: '20px', height: '200px', padding: '10px' }}>
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

        </>
    );
};

export default SelectAttackers;
