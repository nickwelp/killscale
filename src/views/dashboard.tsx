import React, { ChangeEvent, useContext, useReducer, useState } from 'react';

import Display from './Display';
import HelpText from './HelpText';
import UIOptions from './UIOptions';

import { ITarget } from '../models/interfaces';

import { targets } from './TargetFaction';

import { MyUserContext } from '../controllers/context/UserContext';
import SelectAttackers from './SelectAttackers';
import SelectTargets from './SelectTargets';
import SaveData from './SaveData';
import LoadData from './LoadData';
import { attackers } from '../models/units';
import Diagnostics from './Diagnostics';

const loadCache = () => {
    const DashCache = JSON.parse(localStorage.getItem('dashboardUISettings') || '{}');
    return { DashCache };
}

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

    const { DashCache } = loadCache();

    const { userCreatedTargets, userCreatedAttackers } = useContext(MyUserContext);

    const [showDiagnostics, updateDiagnostics] = useState(false);

    // list of selected targets
    const [targetList, dispatch] = useReducer(reducer, [0]);
    // do we want to count total wounds like we're shooting a Knight?
    // or do we want to count dead models? sumWounds = false means we count 
    // dead models
    const [targetFaction, setTargetFaction] = useReducer(selectTargetFactionsReducer, ['marines']);

    const [iterations, setIterations] = useState(3000);

    // const [sumWounds, setState] = useState(false);
    const [sumWounds, setSumWounds] = useState(DashCache.sumWounds !== undefined ? DashCache.sumWounds : false);
    const setState = (a: boolean) => {
        setSumWounds(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), sumWounds: a }));
    }
    const [rerollHits, updateRerollHits] = useState(DashCache.rerollHits !== undefined ? DashCache.rerollHits : true);
    const setRerollHits = (a: boolean) => {
        updateRerollHits(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), rerollHits: a }));
    }
    const [devastator, updateDevastor] = useState(DashCache.devastator !== undefined ? DashCache.devastator : true);
    const setDevastor = (a: boolean) => {
        updateDevastor(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), devastator: a }));
    }
    const [tactical, updateTactical] = useState(DashCache.tactical !== undefined ? DashCache.tactical : true);
    const setTactical = (a: boolean) => {
        updateTactical(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), tactical: a }));
    }
    const [assault, updateAssault] = useState(DashCache.assault !== undefined ? DashCache.assault : true);
    const setAssault = (a: boolean) => {
        updateAssault(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), assault: a }));
    }
    const [explodingBolter6s, updateExplodingBolter6s] = useState(DashCache.explodingBolter6s !== undefined ? DashCache.explodingBolter6s : true);
    const setExplodingBolter6s = (a: boolean) => {
        updateExplodingBolter6s(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), explodingBolter6s: a }));
    }
    const [crimsonFistsPlusToHit, updateCrimsonFistsPlusToHit] = useState(DashCache.crimsonFistsPlusToHit !== undefined ? DashCache.crimsonFistsPlusToHit : true);
    const setCrimsonFistsPlusToHit = (a: boolean) => {
        updateCrimsonFistsPlusToHit(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), crimsonFistsPlusToHit: a }));
    }
    const [applyHeavyWeaponMinusOneToHit, updateApplyHeavyWeaponMinusOneToHit] = useState(DashCache.applyHeavyWeaponMinusOneToHit !== undefined ? DashCache.applyHeavyWeaponMinusOneToHit : false);
    const setApplyHeavyWeaponMinusOneToHit = (a: boolean) => {
        updateApplyHeavyWeaponMinusOneToHit(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), applyHeavyWeaponMinusOneToHit: a }));
    }

    const [rerollHitRollsOfOne, updateRerollHitRollsOfOne] = useState(DashCache.rerollHitRollsOfOne !== undefined ? DashCache.rerollHitRollsOfOne : true);
    const setRerollHitRollsOfOne = (a: boolean) => {
        updateRerollHitRollsOfOne(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), rerollHitRollsOfOne: a }));
    }
    // const [rerollWounds, setRerollWounds] = useState(false);
    const rerollWounds = false;
    const [rerollWoundRollsOfOne, updateRerollWoundRollsOfOne] = useState(DashCache.rerollWoundRollsOfOne !== undefined ? DashCache.rerollWoundRollsOfOne : true);
    const setRerollWoundRollsOfOne = (a: boolean) => {
        updateRerollWoundRollsOfOne(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), rerollWoundRollsOfOne: a }));
    }
    const [hideUncheckedWeapons, updateHideUncheckedWeapons] = useState(DashCache.hideUncheckedWeapons !== undefined ? DashCache.hideUncheckedWeapons : false);
    const setHideUncheckedWeapons = (a: boolean) => {
        updateHideUncheckedWeapons(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), hideUncheckedWeapons: a }));
    }
    const [IFHeavyWeaponsSuperDoctrine, updateIFHeavyWeaponsSuperDoctrine] = useState(DashCache.IFHeavyWeaponsSuperDoctrine !== undefined ? DashCache.IFHeavyWeaponsSuperDoctrine : true);
    const setIFHeavyWeaponsSuperDoctrine = (a: boolean) => {
        updateIFHeavyWeaponsSuperDoctrine(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), IFHeavyWeaponsSuperDoctrine: a }));
    }

    // modal controls
    const [showOptions, setShowOptions] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    const [showSaveData, setShowSaveData] = useState(false);
    const [showLoadData, setShowLoadData] = useState(false);

    const availableTargets = (a: string[]): ITarget[] => [...userCreatedTargets, ...targets(a)];

    const [chooseTargets, updateChooseTargets] = useState(false);

    const mergedAttackers = [...attackers, ...userCreatedAttackers];

    /** manage attackers */
    const cachedSelections = JSON.parse(localStorage.getItem('activeAttackers') || '[]');
    const [activeAttackersList, updateActiveAttackersList] = useState(cachedSelections.length !== 0 ? cachedSelections : mergedAttackers.map((_, i) => i));
    const setActiveAttackersList = (e: ChangeEvent<HTMLInputElement>) => {
        const index = parseInt(e.currentTarget.value, 10);
        const status = e.currentTarget.checked === true;
        if (status) {
            updateActiveAttackersList([...new Set([index, ...activeAttackersList])]);
            localStorage.setItem('activeAttackers', JSON.stringify([...new Set([index, ...activeAttackersList])]));
        } else {
            updateActiveAttackersList(activeAttackersList.filter((e: number) => e !== index));
            localStorage.setItem('activeAttackers', JSON.stringify(activeAttackersList.filter((e: number) => e !== index)));
        }
    };
    const [showSelectAttackers, setShowSelectAttackers] = useState(false);
    /** end manage attackers */

    const dashObject = () => {
        return {
            sumWounds,
            rerollHits,
            devastator,
            tactical,
            assault,
            explodingBolter6s,
            crimsonFistsPlusToHit,
            rerollHitRollsOfOne,
            rerollWoundRollsOfOne,
            hideUncheckedWeapons,
            IFHeavyWeaponsSuperDoctrine,
            applyHeavyWeaponMinusOneToHit,
        };
    }
    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>

                <label style={{ marginRight: '15px' }} >Show Options <input checked={showOptions} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowOptions(!!e.currentTarget.checked)} /> </label>
                <label style={{ marginRight: '15px' }}>Select Targets<input checked={chooseTargets} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => updateChooseTargets(!!e.currentTarget.checked)} /> </label>
                <label style={{ marginRight: '15px' }}>Select Attacking Units <input type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowSelectAttackers(!!e.currentTarget.checked)} /></label>
                <label style={{ marginRight: '15px' }}>Show Help <input checked={showHelp} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowHelp(!!e.currentTarget.checked)} /> </label>
                <label style={{ marginRight: '15px' }}>Save Data<input checked={showSaveData} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowSaveData(!!e.currentTarget.checked)} /> </label>
                <label style={{ marginRight: '15px' }}>Load Data<input checked={showLoadData} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowLoadData(!!e.currentTarget.checked)} /> </label>
                <label style={{ marginRight: '15px' }}>Diagnostics<input checked={showDiagnostics} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => updateDiagnostics(!!e.currentTarget.checked)} /> </label>
            </div>
            {showHelp && <HelpText />}
            {showSelectAttackers &&
                <SelectAttackers activeAttackersList={activeAttackersList} setActiveAttackersList={setActiveAttackersList} />}
            {chooseTargets &&
                <SelectTargets
                    props={{
                        targets: availableTargets(targetFaction),
                        targetFaction, setTargetFaction,
                        dispatch
                    }} />}
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
                    applyHeavyWeaponMinusOneToHit, setApplyHeavyWeaponMinusOneToHit,
                    iterations, setIterations
                }} />}
            {showSaveData && <SaveData />}
            {showLoadData && <LoadData />}
            {showDiagnostics && <Diagnostics />}
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
                applyHeavyWeaponMinusOneToHit,
                iterations
            }} />
        </div >
    );
};

export default Dashboard;