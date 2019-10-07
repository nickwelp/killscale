import React, { useState, useReducer } from 'react';

import Intercessors from '../models/targets/hooson/intercessors';
import IronHandsRepulsorExecutioner from '../models/targets/ironHands/ihRepulsorExecutioner';
import RepulsorExecutioner from '../models/targets/basicMarines/repulsorExecutioner';
import Rhino from '../models/targets/basicMarines/rhino';
import Leviathan from '../models/targets/basicMarines/leviathan';
import Tacticals from '../models/targets/basicMarines/tacticals';
import PlagueBearers from '../models/targets/vessel/plagueBearers';
import DeathshroudTerminators from '../models/targets/vessel/DeathshroudTerminators';

import ShootingProfile from './shootingProfile';
import { ITarget, IUnit } from '../models/interfaces';

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

// targets: ITarget[],

const Dashboard = (shooters: IUnit[], activeList: number[]) => {
    // list of selected targets
    const [targetList, dispatch] = useReducer(reducer, [0]);

    // do we want to count total wounds like we're shooting a Knight?
    // or do we want to count dead models? sumWounds = false means we count 
    // dead models
    const [sumWounds, setState] = useState(false);
    // const [currentTarget, setTarget] = useState(0);
    const [rerollHits, setRerollHits] = useState(true);

    const [devastator, setDevastor] = useState(true);
    const [tactical, setTactical] = useState(true);
    const [assault, setAssault] = useState(true);
    const [explodingBolter6s, setExplodingBolter6s] = useState(true);
    const [crimsonFistsPlusToHit, setCrimsonFistsPlusToHit] = useState(true);

    const [rerollHitRollsOfOne, setRerollHitRollsOfOne] = useState(true);
    // const [rerollWounds, setRerollWounds] = useState(false);
    const rerollWounds = false;
    const [rerollWoundRollsOfOne, setRerollWouldRollsOfOne] = useState(true);

    const [hideUncheckedWeapons, setHideUncheckedWeapons] = useState(false);

    const targets = [PlagueBearers, DeathshroudTerminators, Intercessors, Leviathan, Tacticals, IronHandsRepulsorExecutioner, RepulsorExecutioner, Rhino];

    const display = () => {
        const selectedTargets: ITarget[] = targets.filter((_, i) => targetList.includes(i));
        const profiles = shooters.map((shooter, i) => {
            const uiSettings = {
                hideUncheckedWeapons
            }
            const rerollProfile = {
                rerollHits,
                rerollHitRollsOfOne,
                rerollWounds,
                rerollWoundRollsOfOne,
                explodingBolter6s,
                crimsonFistsPlusToHit
            };
            const doctrine = {
                devastator,
                tactical,
                assault
            };
            const hideProfile = !activeList.includes(i);
            return ShootingProfile({ shooter, targets: selectedTargets, sumWounds, rerollProfile, doctrine, uiSettings, hideProfile });
        });
        return (
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {profiles}
            </div>
        )
    };


    return (
        <div >
            <div style={{ display: 'flex', flexDirection: 'row', margin: '5px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div>
                        <label>Count Total Wounds <input name={'deadModels'} checked={sumWounds} value='false' onClick={(e: React.MouseEvent<HTMLInputElement>) => setState(true)} type={'radio'} /></label> <small>useful against knights and big things</small>
                    </div>
                    <div>
                        <label>Count Dead Models <input name={'deadModels'} checked={!sumWounds} value='true' onClick={(e: React.MouseEvent<HTMLInputElement>) => setState(false)} type={'radio'} /></label> <small>useful against many small things</small>
                    </div>
                    <div>
                        <label>
                            Select Target:
                        </label>
                        <select multiple={true} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => dispatch({ element: e.currentTarget })}>
                            {targets.map((t, i) => {
                                return (
                                    <option key={i} selected={i === 0} value={i}>{t.name}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div>
                        <label><input type={'checkbox'} checked={hideUncheckedWeapons} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHideUncheckedWeapons(!!e.currentTarget.checked)} name={'hideUncheckedWeapons'} /> Hide Unchecked Weapons </label>
                    </div>
                </div>
                <div style={{ margin: '3px', flexGrow: 1, fontSize: '12px', textAlign: 'right' }}>
                    <p><small>Full Reroll Best Partial Rerolls</small></p>
                    {/* <div>
                        <label>Reroll Wounds <input type={'checkbox'} value='1' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRerollWounds(!!e.currentTarget.checked)} /></label>
                    </div> */}
                    <div>
                        <label>Reroll Wounds Rolls of One <input type={'checkbox'} value='1' checked={rerollWoundRollsOfOne} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRerollWouldRollsOfOne(!!e.currentTarget.checked)} /></label>
                    </div>
                    <div>
                        <label>Reroll Hits<input type={'checkbox'} value='1' checked={rerollHits} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRerollHits(!!e.currentTarget.checked)} /></label>
                    </div>
                    <div>
                        <label>Reroll Hit Rolls of One<input type={'checkbox'} value='1' checked={rerollHitRollsOfOne} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRerollHitRollsOfOne(!!e.currentTarget.checked)} /></label>
                    </div>
                </div>
                <div style={{ margin: '3px', flexGrow: 1, fontSize: '12px', textAlign: 'right' }}>
                    <p><small>Doctrine</small></p>
                    {/* <div>
                        <label>Reroll Wounds <input type={'checkbox'} value='1' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRerollWounds(!!e.currentTarget.checked)} /></label>
                    </div> */}
                    <div>
                        <label>Devastator <input type={'checkbox'} value='1' checked={devastator} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDevastor(!!e.currentTarget.checked)} /></label>
                    </div>
                    <div>
                        <label>Tactical <input type={'checkbox'} value='1' checked={tactical} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTactical(!!e.currentTarget.checked)} /></label>
                    </div>
                    <div>
                        <label>Assault <input type={'checkbox'} value='1' checked={assault} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAssault(!!e.currentTarget.checked)} /></label>
                    </div>
                    <div>
                        <label>Crimson Fists/Imperial Fists exploding Bolter 6s <input type={'checkbox'} value='1' checked={explodingBolter6s} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExplodingBolter6s(!!e.currentTarget.checked)} /></label>
                    </div>
                    <div>
                        <label>Crimson Fists +1 to Hit (applied in likely instances) <input type={'checkbox'} value='1' checked={crimsonFistsPlusToHit} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCrimsonFistsPlusToHit(!!e.currentTarget.checked)} /></label>
                    </div>
                    {/* <div>
                        <label>Heavy Weapons cause +1D against Vehicles <input type={'checkbox'} value='1' checked={crimsonFistsPlusToHit} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCrimsonFistsPlusToHit(!!e.currentTarget.checked)} /></label>
                    </div> */}
                </div>
            </div>



            {display()}
        </div >
    );
};

export default Dashboard;