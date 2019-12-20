import React, { useContext } from 'react';

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

    const { userCreatedAttackers, userCreatedWeaponProfiles, } = useContext(MyUserContext)

    const listOfUserCreatedWeapons = (userCreatedWeaponProfiles: IWeaponProfile[]) => {
        return userCreatedWeaponProfiles.map(({ name }: IWeaponProfile, i: number) => {
            return (<span key={i}>{name}, </span>);
        });
    }

    const options = (attackers: IUnit[]) => attackers.map((shooter, i) => {
        return (
            <li key={i}>
                <label>
                    <input type={'checkbox'} name={'shooterSelection'} value={i} checked={activeAttackersList.includes(i)} onChange={setActiveAttackersList} />
                    {shooter.name}
                </label>
            </li>
        );
    });
    return (
        <>
            <ul style={{ listStyleType: 'none', fontSize: 'small', display: 'flex', flexFlow: 'column wrap', width: '90%', maxWidth: '1500px', borderRadius: '3px', boxShadow: '2px 2px 5px #999', margin: 'auto', columnCount: 2, columnGap: '20px', height: '130px', padding: '10px' }}>
                {options([...attackers, ...userCreatedAttackers])}
            </ul>
            <div style={{ padding: '10px' }}>
                <p>
                    {listOfUserCreatedWeapons(userCreatedWeaponProfiles)}
                </p>
                <AddWeapon />
                <AddAttacker />
            </div>

        </>
    );
};

export default SelectAttackers;
