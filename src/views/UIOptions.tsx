import React, { ChangeEvent, useContext } from 'react';

import { MyUserContext } from '../controllers/context/UserContext';

const UIOptions = () => {
    const {
        rerollHits, setRerollHits,
        devastator, setDevastor,
        tactical, setTactical,
        assault, setAssault,
        explodingBolter6s, setExplodingBolter6s,
        crimsonFistsPlusToHit, setCrimsonFistsPlusToHit,
        rerollHitRollsOfOne, setRerollHitRollsOfOne,
        rerollWoundRollsOfOne, setRerollWoundRollsOfOne,
        IFHeavyWeaponsSuperDoctrine, setIFHeavyWeaponsSuperDoctrine,
        applyHeavyWeaponMinusOneToHit, setApplyHeavyWeaponMinusOneToHit,
        iterations, setIterations
    } = useContext(MyUserContext);

    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '10px auto 10px auto', padding: '10px', boxShadow: '2px 2px 5px #999', maxWidth: '1400px', width: '90%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div>
                    <label>Simulation Count (larger correlates with smoother predictions) <br />
                        <select id={'simulationCount'} name={'simulationCount'} defaultValue={iterations.toString()}
                            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                const i = parseInt(e.currentTarget.value, 10);
                                setIterations(i);
                            }}
                        >
                            <option value={'10'}>10</option>
                            <option value={'100'}>100</option>
                            <option value={'500'}>500</option>
                            <option value={'1000'}>1000</option>
                            <option value={'2000'}>2000</option>
                            <option value={'3000'}>3000</option>
                            <option value={'4000'}>4000</option>
                            <option value={'5000'}>5000</option>
                            <option value={'6000'}>6000</option>
                            <option value={'7000'}>7000</option>
                            <option value={'8000'}>8000</option>
                            <option value={'9000'}>9000</option>
                            <option value={'10000'}>10000</option>
                            <option value={'12000'}>12000</option>
                            <option value={'25000'}>25000</option>
                            <option value={'50000'}>50000</option>
                            <option value={'100000'}>100000</option>
                        </select>
                    </label>
                </div>

            </div>
            <div style={{ margin: '3px', flexGrow: 1, fontSize: '12px', textAlign: 'right' }}>
                <p><small>Full Reroll Best Partial Rerolls</small></p>
                {/* <div>
                    <label>Reroll Wounds <input type={'checkbox'} value='1' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRerollWounds(!!e.currentTarget.checked)} /></label>
                </div> */}
                <div>
                    <label>Reroll Wounds Rolls of One <input type={'checkbox'} value="1" checked={rerollWoundRollsOfOne} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRerollWoundRollsOfOne(!!e.currentTarget.checked)} /></label>
                </div>
                <div>
                    <label>Reroll Hits<input type={'checkbox'} value="1" checked={rerollHits} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRerollHits(!!e.currentTarget.checked)} /></label>
                </div>
                <div>
                    <label>Reroll Hit Rolls of One<input type={'checkbox'} value="1" checked={rerollHitRollsOfOne} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRerollHitRollsOfOne(!!e.currentTarget.checked)} /></label>
                </div>
                <div>
                    <label>Apply Heavy Weapons Minus One to Hit <input type={'checkbox'} value="1" checked={applyHeavyWeaponMinusOneToHit} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setApplyHeavyWeaponMinusOneToHit(!!e.currentTarget.checked)} /></label>
                </div>
            </div>
            <div style={{ margin: '3px', flexGrow: 1, fontSize: '12px', textAlign: 'right' }}>
                <p><small>Doctrines</small></p>
                {/* <div>
                    <label>Reroll Wounds <input type={'checkbox'} value='1' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRerollWounds(!!e.currentTarget.checked)} /></label>
                </div> */}
                <div>
                    <label>Devastator <input type={'checkbox'} value="1" checked={devastator} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDevastor(!!e.currentTarget.checked)} /></label>
                </div>
                <div>
                    <label>Tactical <input type={'checkbox'} value="1" checked={tactical} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTactical(!!e.currentTarget.checked)} /></label>
                </div>
                <div>
                    <label>Assault <input type={'checkbox'} value="1" checked={assault} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAssault(!!e.currentTarget.checked)} /></label>
                </div>
                <div>
                    <label>Crimson Fists/Imperial Fists exploding Bolter 6s <input type={'checkbox'} value="1" checked={explodingBolter6s} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExplodingBolter6s(!!e.currentTarget.checked)} /></label>
                </div>
                <div>
                    <label>Crimson Fists +1 to Hit (applied in likely instances) <input type={'checkbox'} value="1" checked={crimsonFistsPlusToHit} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCrimsonFistsPlusToHit(!!e.currentTarget.checked)} /></label>
                </div>
                <div>
                    <label>Imperial Fist Super Doctrine Heavy Weapons cause +1D against Vehicles <input type={'checkbox'} value="1" checked={IFHeavyWeaponsSuperDoctrine} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIFHeavyWeaponsSuperDoctrine(!!e.currentTarget.checked)} /></label>
                </div>
            </div>
        </div>);
};

export default UIOptions;