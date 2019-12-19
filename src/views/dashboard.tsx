import React, { ChangeEvent, useContext, useReducer, useState } from 'react';

import Display from './Display';
import HelpText from './HelpText';
import UIOptions from './UIOptions';

import { ITarget } from '../models/interfaces';

import { targets } from './TargetFaction';

import { MyUserContext } from '../controllers/context/UserContext';
import SelectAttackers from './SelectAttackers';
import SelectTargets from './SelectTargets';

import { attackers } from '../models/units';


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

const Dashboard = () => {

    const { userCreatedTargets } = useContext(MyUserContext);


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
    const [applyHeavyWeaponMinusOneToHit, setApplyHeavyWeaponMinusOneToHit] = useState(false);

    const [rerollHitRollsOfOne, setRerollHitRollsOfOne] = useState(true);
    // const [rerollWounds, setRerollWounds] = useState(false);
    const rerollWounds = false;
    const [rerollWoundRollsOfOne, setRerollWoundRollsOfOne] = useState(true);
    const [hideUncheckedWeapons, setHideUncheckedWeapons] = useState(false);
    const [IFHeavyWeaponsSuperDoctrine, setIFHeavyWeaponsSuperDoctrine] = useState(true);
    const [showOptions, setShowOptions] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    const availableTargets = (a: string[]): ITarget[] => [...userCreatedTargets, ...targets(a)];

    const [chooseTargets, updateChooseTargets] = useState(false);

    /** manage attackers */
    const [activeAttackersList, updateActiveAttackersList] = useState(attackers.map((_, i) => i));
    const setActiveAttackersList = (e: ChangeEvent<HTMLInputElement>) => {
        const index = parseInt(e.currentTarget.value, 10);
        const status = e.currentTarget.checked === true;
        if (status) {
            updateActiveAttackersList([...new Set([index, ...activeAttackersList])]);
        } else {
            updateActiveAttackersList(activeAttackersList.filter((e: number) => e !== index));
        }
    };
    const [showSelectAttackers, setShowSelectAttackers] = useState(false);
    /** end manage attackers */

    return (
        <div>
            <div><label >Show Help <input checked={showHelp} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowHelp(!!e.currentTarget.checked)} /> </label> </div>
            {showHelp && <HelpText />}

            <label>Select Attacking Units <input type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowSelectAttackers(!!e.currentTarget.checked)} /></label>
            {showSelectAttackers &&
                <SelectAttackers activeAttackersList={activeAttackersList} setActiveAttackersList={setActiveAttackersList} />}

            <div><label >Select Targets<input checked={chooseTargets} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => updateChooseTargets(!!e.currentTarget.checked)} /> </label> </div>
            {chooseTargets &&
                <SelectTargets
                    props={{
                        targets: availableTargets(targetFaction),
                        targetFaction, setTargetFaction,
                        dispatch
                    }} />}

            <div><label >Show Options <input checked={showOptions} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowOptions(!!e.currentTarget.checked)} /> </label> </div>
            {showOptions &&
                <UIOptions props={{
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
                    IFHeavyWeaponsSuperDoctrine, setIFHeavyWeaponsSuperDoctrine,
                    applyHeavyWeaponMinusOneToHit, setApplyHeavyWeaponMinusOneToHit
                }} />}
            <Display props={{
                attackers,
                activeAttackersList,
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
                IFHeavyWeaponsSuperDoctrine,
                applyHeavyWeaponMinusOneToHit
            }} />
        </div >
    );
};

export default Dashboard;