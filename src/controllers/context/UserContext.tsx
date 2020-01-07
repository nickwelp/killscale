import React, { useState, useReducer, ChangeEvent } from 'react';

import { ITarget, IUnit, IWeaponProfile } from '../../models/interfaces';
import { decodeRollsForSavingState } from '../util';
import { IStandDevReport } from '../library/calculateStandardDev';

import { attackers } from '../../models/units';


import { targets } from '../../views/TargetFaction';

// @ts-ignore
export const MyUserContext = React.createContext();

interface IProps {
    children: any;
}

const emptyTargetArray: ITarget[] = [];
const emptyAttackerArray: IUnit[] = [];
const emptyWeaponProfiles: IWeaponProfile[] = [];

const outcomesStateManager = (state: any, rep: IStandDevReport[]) => {
    const newState = [...state];
    const [report] = rep;
    let alreadyExists = false;
    newState.forEach((s, i) => {
        if (s.name !== undefined) {
            if (s.name === report.name && s.target === report.target) {
                alreadyExists = true;
                newState[i] = report;
            }
        }
    });
    if (!alreadyExists) newState.push(report);
    return newState;
};

const loadCache = (): any => {
    const targetCache = JSON.parse(localStorage.getItem('userCreatedTargets') || '[]');
    const attackerCache = JSON.parse(localStorage.getItem('userCreatedAttackers') || '[]');
    const weaponCache = JSON.parse(localStorage.getItem('userCreatedWeaponProfiles') || '[]');
    const DashCache = JSON.parse(localStorage.getItem('dashboardUISettings') || '{}');
    const attackerSelections = JSON.parse(localStorage.getItem('activeAttackers') || '[]');

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
    return { targetCache, attackerCache, weaponCache, DashCache, attackerSelections };

};

/* originally from Dashboard */

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
/* end from Dashboard */


const UserContext = ({ children }: IProps) => {
    const { targetCache, attackerCache, weaponCache, DashCache, attackerSelections } = loadCache();


    /* originally in dashboard */
    const [showDiagnostics, updateDiagnostics] = useState(false);
    // list of selected targets
    const [targetList, dispatch] = useReducer(reducer, [0]);
    const [targetFaction, setTargetFaction] = useReducer(selectTargetFactionsReducer, ['marines']);
    const [iterations, setIterations] = useState(3000);
    const [sumWounds, setSumWounds] = useState(DashCache.sumWounds !== undefined ? DashCache.sumWounds : false);
    const setState = (a: boolean) => {
        setSumWounds(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), sumWounds: a }));
    };
    const [rerollHits, updateRerollHits] = useState(DashCache.rerollHits !== undefined ? DashCache.rerollHits : true);
    const setRerollHits = (a: boolean) => {
        updateRerollHits(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), rerollHits: a }));
    };

    const [devastator, updateDevastor] = useState(DashCache.devastator !== undefined ? DashCache.devastator : true);
    const setDevastor = (a: boolean) => {
        updateDevastor(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), devastator: a }));
    };
    const [tactical, updateTactical] = useState(DashCache.tactical !== undefined ? DashCache.tactical : true);
    const setTactical = (a: boolean) => {
        updateTactical(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), tactical: a }));
    };
    const [assault, updateAssault] = useState(DashCache.assault !== undefined ? DashCache.assault : true);
    const setAssault = (a: boolean) => {
        updateAssault(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), assault: a }));
    };
    const [explodingBolter6s, updateExplodingBolter6s] = useState(DashCache.explodingBolter6s !== undefined ? DashCache.explodingBolter6s : true);
    const setExplodingBolter6s = (a: boolean) => {
        updateExplodingBolter6s(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), explodingBolter6s: a }));
    };
    const [crimsonFistsPlusToHit, updateCrimsonFistsPlusToHit] = useState(DashCache.crimsonFistsPlusToHit !== undefined ? DashCache.crimsonFistsPlusToHit : true);
    const setCrimsonFistsPlusToHit = (a: boolean) => {
        updateCrimsonFistsPlusToHit(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), crimsonFistsPlusToHit: a }));
    };
    const [applyHeavyWeaponMinusOneToHit, updateApplyHeavyWeaponMinusOneToHit] = useState(DashCache.applyHeavyWeaponMinusOneToHit !== undefined ? DashCache.applyHeavyWeaponMinusOneToHit : false);
    const setApplyHeavyWeaponMinusOneToHit = (a: boolean) => {
        updateApplyHeavyWeaponMinusOneToHit(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), applyHeavyWeaponMinusOneToHit: a }));
    };

    const [rerollHitRollsOfOne, updateRerollHitRollsOfOne] = useState(DashCache.rerollHitRollsOfOne !== undefined ? DashCache.rerollHitRollsOfOne : true);
    const setRerollHitRollsOfOne = (a: boolean) => {
        updateRerollHitRollsOfOne(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), rerollHitRollsOfOne: a }));
    };
    // const [rerollWounds, setRerollWounds] = useState(false);
    const rerollWounds = false;

    const [rerollWoundRollsOfOne, updateRerollWoundRollsOfOne] = useState(DashCache.rerollWoundRollsOfOne !== undefined ? DashCache.rerollWoundRollsOfOne : true);
    const setRerollWoundRollsOfOne = (a: boolean) => {
        updateRerollWoundRollsOfOne(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), rerollWoundRollsOfOne: a }));
    };
    const [hideUncheckedWeapons, updateHideUncheckedWeapons] = useState(DashCache.hideUncheckedWeapons !== undefined ? DashCache.hideUncheckedWeapons : false);
    const setHideUncheckedWeapons = (a: boolean) => {
        updateHideUncheckedWeapons(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), hideUncheckedWeapons: a }));
    };
    const [IFHeavyWeaponsSuperDoctrine, updateIFHeavyWeaponsSuperDoctrine] = useState(DashCache.IFHeavyWeaponsSuperDoctrine !== undefined ? DashCache.IFHeavyWeaponsSuperDoctrine : true);
    const setIFHeavyWeaponsSuperDoctrine = (a: boolean) => {
        updateIFHeavyWeaponsSuperDoctrine(a);
        localStorage.removeItem('dashboardUISettings');
        localStorage.setItem('dashboardUISettings', JSON.stringify({ ...dashObject(), IFHeavyWeaponsSuperDoctrine: a }));
    };

    // modal controls
    const [showOptions, setShowOptions] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [showSaveData, setShowSaveData] = useState(false);
    const [showLoadData, setShowLoadData] = useState(false);

    const availableTargets = (a: string[]): ITarget[] => [...userCreatedTargets, ...targets(a)];

    const [chooseTargets, updateChooseTargets] = useState(false);

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
    };

    /* end dashbaord */

    const stateMan: any[] = [];
    const [outcomesState, manageOutcomesState] = useReducer(outcomesStateManager, stateMan);

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

    const mergedAttackers = [...attackers, ...userCreatedAttackers];

    /** manage attackers */

    const [activeAttackersList, updateActiveAttackersList] = useState(attackerSelections.length !== 0 ? attackerSelections : mergedAttackers.map((_, i) => i));
    const setActiveAttackersList = (e: ChangeEvent<HTMLInputElement>) => {
        const index = parseInt(e.currentTarget.value, 10);
        const status = e.currentTarget.checked === true;
        if (status) {
            updateActiveAttackersList([...new Set([index, ...activeAttackersList])]);
            localStorage.setItem('activeAttackers', JSON.stringify([...new Set([index, ...activeAttackersList])]));
            setTimeout(() => {
                const removedAttacker = mergedAttackers[index];
                if (outcomesState && outcomesState.length > 0) {
                    outcomesState.forEach((report) => {
                        if (report.name === removedAttacker.name) {
                            manageOutcomesState([{ ...report, remove: false }]);
                        }
                    });
                }
            }, 0);
        } else {
            const removedAttacker = mergedAttackers[index];
            if (outcomesState && outcomesState.length > 0) {
                outcomesState.forEach((report) => {
                    if (report.name === removedAttacker.name) {
                        manageOutcomesState([{ ...report, remove: true }]);
                    }
                });
            }
            updateActiveAttackersList(activeAttackersList.filter((e: number) => e !== index));
            // outcomesStateManager
            localStorage.setItem('activeAttackers', JSON.stringify(activeAttackersList.filter((e: number) => e !== index)));
        }
    };

    const [showSelectAttackers, setShowSelectAttackers] = useState(false);
    /** end manage attackers */


    return (
        <MyUserContext.Provider value={{
            attackers: mergedAttackers,
            userCreatedTargets,
            addUserCreatedTarget,
            userCreatedAttackers,
            addUserCreatedAttacker,
            userCreatedWeaponProfiles,
            addUserCreatedWeaponProfiles,
            outcomesState, manageOutcomesState,
            showDiagnostics, updateDiagnostics,
            targetList, dispatch,
            targetFaction, setTargetFaction,
            iterations, setIterations,
            sumWounds, setSumWounds, setState,
            rerollHits, updateRerollHits, setRerollHits,
            devastator, updateDevastor, setDevastor,
            tactical, updateTactical, setTactical,
            assault, updateAssault, setAssault,
            explodingBolter6s, updateExplodingBolter6s, setExplodingBolter6s,
            applyHeavyWeaponMinusOneToHit, updateApplyHeavyWeaponMinusOneToHit, setApplyHeavyWeaponMinusOneToHit,
            rerollHitRollsOfOne, updateRerollHitRollsOfOne, setRerollHitRollsOfOne,
            rerollWoundRollsOfOne, updateRerollWoundRollsOfOne, setRerollWoundRollsOfOne,
            hideUncheckedWeapons, updateHideUncheckedWeapons, setHideUncheckedWeapons,
            IFHeavyWeaponsSuperDoctrine, updateIFHeavyWeaponsSuperDoctrine, setIFHeavyWeaponsSuperDoctrine,
            showOptions, setShowOptions,
            showHelp, setShowHelp,
            showSaveData, setShowSaveData,
            showLoadData, setShowLoadData,
            availableTargets,
            chooseTargets, updateChooseTargets,
            crimsonFistsPlusToHit, updateCrimsonFistsPlusToHit, setCrimsonFistsPlusToHit,
            activeAttackersList, updateActiveAttackersList, setActiveAttackersList,
            rerollWounds,
            dashObject,
            showSelectAttackers, setShowSelectAttackers
        }}>
            {children}
        </MyUserContext.Provider>
    );
};

export default UserContext;

