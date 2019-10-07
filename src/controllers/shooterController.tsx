import React, { useReducer, ChangeEvent, useState } from 'react';

import { ContemptorMortis } from '../models/units/heavySupport/ContemptorMortis';
import { Invictors } from '../models/units/elite/Invictors';
import { Intercessor } from '../models/units/troops';
import { VernerableDreadnaughts } from '../models/units/elite/VernerableDreadnaughts';
import { Dreadnaughts } from '../models/units/elite/Dreadnaughts';
import { Suppressors } from '../models/units/fastAttack/Suppressors';
import { Tarantula } from '../models/units/fastAttack/Tarantula';
import { Elminators } from '../models/units/heavySupport/Elminators';
import { IUnit } from '../models/interfaces';

const shooters = [Intercessor, Invictors, ContemptorMortis, Elminators, Suppressors, Tarantula, VernerableDreadnaughts, Dreadnaughts];

interface IDispatch {
    element: HTMLInputElement;
}

const reducer = (state: number[], { element }: IDispatch) => {
    let newState: number[] = [];
    const value = parseInt(element.value);
    if (element.checked && !state.includes(value)) {
        newState = [...state];
        newState.push(value);
    }
    if (!element.checked) {
        newState = state.filter((_, i) => i !== value);
    }
    return newState;
};


export const ShooterController = (dashboard: (a: IUnit[], b: number[]) => any) => {
    const [activeList, dispatch] = useReducer(reducer, shooters.map((_, i) => i));
    const [showOptions, setShowOptions] = useState(false);
    const options = shooters.map((shooter, i) => {
        return (
            <li>
                <label>
                    <input type={'checkbox'} name={'shooterSelection'} value={i} checked={activeList.includes(i)} onChange={(e: ChangeEvent<HTMLInputElement>) => dispatch({ element: e.currentTarget })} />
                    {shooter.name}
                </label>
            </li>
        );
    });
    return (
        <>
            <div>
                <label>select Offensive Units <input type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowOptions(!!e.currentTarget.checked)} /></label>
                <ul>
                    {showOptions && options}
                </ul>
            </div>
            <div>
                {dashboard(shooters, activeList)}
            </div>
        </>);
};


