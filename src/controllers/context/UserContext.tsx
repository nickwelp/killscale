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

const UserContext = ({ children }: IProps) => {
    const [userCreatedTargets, updateUserCreatedTargets] = useState(emptyTargetArray);
    const addUserCreatedTarget = (a: ITarget) => updateUserCreatedTargets([...userCreatedTargets, a]);

    const [userCreatedAttackers, updateUserAttackers] = useState(emptyAttackerArray);
    const addUserCreatedAttacker = (a: IUnit) => updateUserAttackers([...userCreatedAttackers, a]);

    const [userCreatedWeaponProfiles, updateUserCreatedWeaponProfiles] = useState(emptyWeaponProfiles);
    const addUserCreatedWeaponProfiles = (a: IWeaponProfile) => updateUserCreatedWeaponProfiles([...userCreatedWeaponProfiles, a]);

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

// export const MyUserConsumer = MyUserContext.Consumer;
