import React, { useState } from 'react';

import { ITarget, IUnit, IWeaponProfile } from '../../models/interfaces';
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
    return { targetCache, attackerCache, weaponCache };
};

const UserContext = ({ children }: IProps) => {
    const { targetCache, attackerCache, weaponCache } = loadCache();

    const initTargets = (targetCache.length > 0 ? targetCache : false) || emptyTargetArray;
    const [userCreatedTargets, updateUserCreatedTargets] = useState(initTargets);
    const addUserCreatedTarget = (a: ITarget) => {
        localStorage.removeItem('userCreatedTargets');
        localStorage.setItem('userCreatedTargets', JSON.stringify([...userCreatedTargets, a]));
        updateUserCreatedTargets([...userCreatedTargets, a])
    };

    const initAttackers = attackerCache || emptyAttackerArray;
    const [userCreatedAttackers, updateUserAttackers] = useState(initAttackers);
    const addUserCreatedAttacker = (a: IUnit) => {
        localStorage.removeItem('userCreatedAttackers');
        localStorage.setItem('userCreatedAttackers', JSON.stringify([...userCreatedAttackers, a]));
        updateUserAttackers([...userCreatedAttackers, a])
    };

    const initWeapons = weaponCache || emptyWeaponProfiles;
    const [userCreatedWeaponProfiles, updateUserCreatedWeaponProfiles] = useState(initWeapons);
    const addUserCreatedWeaponProfiles = (a: IWeaponProfile) => {
        localStorage.removeItem('userCreatedWeaponProfiles');
        localStorage.setItem('userCreatedWeaponProfiles', JSON.stringify([...userCreatedWeaponProfiles, a]));
        updateUserCreatedWeaponProfiles([...userCreatedWeaponProfiles, a]);
    }

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

