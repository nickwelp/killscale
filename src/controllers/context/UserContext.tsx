import React, { useState } from 'react';

import { ITarget } from '../../models/interfaces';
// @ts-ignore
export const MyUserContext = React.createContext();

interface IUser {
    targets: ITarget[];
}

interface IProps {
    children: any;
}

const emptyTargetArray: ITarget[] = [];

const UserContext = ({ children }: IProps) => {
    const [userCreatedTargets, updateUserCreatedTargets] = useState(emptyTargetArray);
    const addUserCreatedTarget = (a: ITarget) => updateUserCreatedTargets([...userCreatedTargets, a]);

    return (
        <MyUserContext.Provider value={{
            userCreatedTargets,
            addUserCreatedTarget
        }}>
            {children}
        </MyUserContext.Provider>
    );
};

export default UserContext;

// export const MyUserConsumer = MyUserContext.Consumer;
