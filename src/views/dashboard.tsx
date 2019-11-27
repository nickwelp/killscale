import React, { ChangeEvent, useReducer, useState } from 'react';

import Display from './Display';
import HelpText from './HelpText';
import UIOptions from './UIOptions';

import { IUnit, ITarget } from '../models/interfaces';

import { targets } from './TargetFaction';

interface IDispatch {
    element: HTMLSelectElement;
}

const reducer = (state: number[], { element }: IDispatch) => {
    const newList: number[] = [];
    for (let t = 0; t < element.options.length; t++) {
        if (element.options[t].selected) newList.push(parseInt(element.options[t].value));
    }
    return newList;
};

const selectTargetFactionsReducer = (state: string[], { element }: IDispatch) => {
    const newList: string[] = [];
    for (let t = 0; t < element.options.length; t++) {
        if (element.options[t].selected) newList.push(element.options[t].value);
    }
    return newList;
};

const Dashboard = (shooters: IUnit[], activeList: number[]) => {
    // list of selected targets
    const [targetList, dispatch] = useReducer(reducer, [0]);
    // do we want to count total wounds like we're shooting a Knight?
    // or do we want to count dead models? sumWounds = false means we count 
    // dead models
    const [targetFaction, setTargetFaction] = useReducer(selectTargetFactionsReducer, ['marines']);

    const [sumWounds, setState] = useState(false);
    const [rerollHits, setRerollHits] = useState(true);

    const [devastator, setDevastor] = useState(true);
    const [tactical, setTactical] = useState(true);
    const [assault, setAssault] = useState(true);
    const [explodingBolter6s, setExplodingBolter6s] = useState(true);
    const [crimsonFistsPlusToHit, setCrimsonFistsPlusToHit] = useState(true);

    const [rerollHitRollsOfOne, setRerollHitRollsOfOne] = useState(true);
    // const [rerollWounds, setRerollWounds] = useState(false);
    const rerollWounds = false;
    const [rerollWoundRollsOfOne, setRerollWoundRollsOfOne] = useState(true);
    const [hideUncheckedWeapons, setHideUncheckedWeapons] = useState(false);
    const [IFHeavyWeaponsSuperDoctrine, setIFHeavyWeaponsSuperDoctrine] = useState(true);
    const [showOptions, setShowOptions] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    const availableTargets = (a: string[]): ITarget[] => targets(a);

    return (
        <div>
            <div><label >Show Help <input checked={showHelp} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowHelp(!!e.currentTarget.checked)} /> </label> </div>
            {showHelp && <HelpText />}
            <div><label >Show Options <input checked={showOptions} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowOptions(!!e.currentTarget.checked)} /> </label> </div>
            {showOptions &&
                <UIOptions props={{
                    targets: availableTargets(targetFaction),
                    targetFaction, setTargetFaction,
                    dispatch,
                    sumWounds, setState,
                    rerollHits, setRerollHits,
                    devastator, setDevastor,
                    tactical, setTactical,
                    assault, setAssault,
                    explodingBolter6s, setExplodingBolter6s,
                    crimsonFistsPlusToHit, setCrimsonFistsPlusToHit,
                    rerollHitRollsOfOne, setRerollHitRollsOfOne,
                    rerollWoundRollsOfOne, setRerollWoundRollsOfOne,
                    hideUncheckedWeapons, setHideUncheckedWeapons,
                    IFHeavyWeaponsSuperDoctrine, setIFHeavyWeaponsSuperDoctrine
                }} />}
            <Display props={{
                shooters,
                activeList,
                targets: availableTargets(targetFaction),
                targetList,
                sumWounds,
                rerollHits,
                devastator,
                tactical,
                assault,
                explodingBolter6s,
                crimsonFistsPlusToHit,
                rerollHitRollsOfOne,
                rerollWounds,
                rerollWoundRollsOfOne,
                hideUncheckedWeapons,
                IFHeavyWeaponsSuperDoctrine
            }} />
        </div >
    );
};

export default Dashboard;