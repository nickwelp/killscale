import React, { useState } from 'react';

import { ITarget, IUnit, IWeaponProfile } from '../../models/interfaces';
import { decodeRollsForSavingState } from '../util';
// @ts-ignore
export const MyUserContext = React.createContext();

interface IUser {
    targets: ITarget[];
    attackers: IUnit[];
    weaponProfiles: IWeaponProfile[];
}

interface IProps {
    children: any;
}

const emptyTargetArray: ITarget[] = [];
const emptyAttackerArray: IUnit[] = [];
const emptyWeaponProfiles: IWeaponProfile[] = [];

const loadCache = (): any => {
    const targetCache = JSON.parse(localStorage.getItem('userCreatedTargets') || '[]');
    const attackerCache = JSON.parse(localStorage.getItem('userCreatedAttackers') || '[]');
    const weaponCache = JSON.parse(localStorage.getItem('userCreatedWeaponProfiles') || '[]');
    weaponCache.forEach((weapon: IWeaponProfile) => {
        weapon.numberOfShots = decodeRollsForSavingState(weapon.numberOfShotsLabel);
        weapon.damage = decodeRollsForSavingState(weapon.damageKey + '');
    });
    attackerCache.forEach((unit: IUnit) => {
        weaponCache.forEach((w: IWeaponProfile, i: number) => {
            if (unit.weaponIndexes && unit.weaponIndexes.includes(i)) {
                if (!unit.weapons) unit.weapons = [];
                unit.weapons.push(w);
            }
        });
    });
    return { targetCache, attackerCache, weaponCache };

};

const UserContext = ({ children }: IProps) => {
    const { targetCache, attackerCache, weaponCache } = loadCache();

    const initTargets = (targetCache.length > 0 ? targetCache : false) || emptyTargetArray;
    const [userCreatedTargets, updateUserCreatedTargets] = useState(initTargets);
    const addUserCreatedTarget = (a: ITarget) => {
        localStorage.removeItem('userCreatedTargets');
        localStorage.setItem('userCreatedTargets', JSON.stringify([...userCreatedTargets, a]));
        updateUserCreatedTargets([...userCreatedTargets, a]);
    };

    const initAttackers = attackerCache || emptyAttackerArray;
    const [userCreatedAttackers, updateUserAttackers] = useState(initAttackers);
    const addUserCreatedAttacker = (a: IUnit) => {
        localStorage.removeItem('userCreatedAttackers');
        const storageAttackers = [...userCreatedAttackers, a].map(e => {
            e.weapons.length = 0;
            return e;
        });
        localStorage.setItem('userCreatedAttackers', JSON.stringify([...storageAttackers]));
        updateUserAttackers([...userCreatedAttackers, a]);
    };

    const initWeapons = weaponCache || emptyWeaponProfiles;
    const [userCreatedWeaponProfiles, updateUserCreatedWeaponProfiles] = useState(initWeapons);
    const addUserCreatedWeaponProfiles = (a: IWeaponProfile) => {
        localStorage.removeItem('userCreatedWeaponProfiles');
        localStorage.setItem('userCreatedWeaponProfiles', JSON.stringify([...userCreatedWeaponProfiles, a]));
        updateUserCreatedWeaponProfiles([...userCreatedWeaponProfiles, a]);
    };

    return (
        <MyUserContext.Provider value={{
            userCreatedTargets,
            addUserCreatedTarget,
            userCreatedAttackers,
            addUserCreatedAttacker,
            userCreatedWeaponProfiles,
            addUserCreatedWeaponProfiles
        }}>
            {children}
        </MyUserContext.Provider>
    );
};

export default UserContext;

