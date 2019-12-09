import React, { ChangeEvent, useState } from 'react';

import { IUnit } from '../models/interfaces';
import { Dreadnaughts } from '../models/units/elite/Dreadnaughts';
import { Invictors } from '../models/units/elite/Invictors';
import { VernerableDreadnaughts } from '../models/units/elite/VernerableDreadnaughts';
import { Suppressors } from '../models/units/fastAttack/Suppressors';
import { Tarantula } from '../models/units/fastAttack/Tarantula';
import { ContemptorMortis } from '../models/units/heavySupport/ContemptorMortis';
import { Devastators } from '../models/units/heavySupport/Devastators';
import { Elminators } from '../models/units/heavySupport/Elminators';
import { RepulsorExecutioner } from '../models/units/heavySupport/RepulsorExecutioner';
import { Repulsor } from '../models/units/transport/Repulsor';
import { Infiltrator, Intercessor } from '../models/units/troops';
import { ThunderfireCannon } from '../models/units/heavySupport/ThunderfireCannon';

const shooters = [Intercessor, Infiltrator, Invictors, ContemptorMortis, Elminators, Suppressors, Tarantula, VernerableDreadnaughts, Dreadnaughts, RepulsorExecutioner, Repulsor, Devastators, ThunderfireCannon];

export const ShooterController = (dashboard: (a: IUnit[], b: number[]) => any) => {
    const [activeList, updateActiveList] = useState(shooters.map((_, i) => i));
    const setActiveList = (e: ChangeEvent<HTMLInputElement>) => {
        const index = parseInt(e.currentTarget.value, 10);
        const status = e.currentTarget.checked === true;
        if (status) {
            updateActiveList([...new Set([index, ...activeList])]);
        } else {
            updateActiveList(activeList.filter((e) => e !== index));
        }
    };
    const [showOptions, setShowOptions] = useState(false);
    const options = shooters.map((shooter, i) => {
        return (
            <li key={i}>
                <label>
                    <input type={'checkbox'} name={'shooterSelection'} value={i} checked={activeList.includes(i)} onChange={setActiveList} />
                    {shooter.name}
                </label>
            </li>
        );
    });
    return (
        <>
            <div>
                <label>Select Offensive Units <input type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowOptions(!!e.currentTarget.checked)} /></label>
                <ul style={{ fontSize: 'small' }}>
                    {showOptions && options}
                </ul>
            </div>
            <div>
                {dashboard(shooters, activeList)}
            </div>
        </>);
};


