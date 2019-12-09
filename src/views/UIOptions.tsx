import React from 'react';

const UIOptions = ({ props }: any) => {
    const {
        targets,
        setTargetFaction,
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
    } = props;
    return (
        <div style={{ display: 'flex', flexDirection: 'row', margin: '5px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div>
                    <label>Count Total Wounds <input name={'deadModels'} checked={sumWounds} value="false" onChange={() => setState(true)} type={'radio'} /></label> <small>useful against knights and big things</small>
                </div>
                <div>
                    <label>Count Dead Models <input name={'deadModels'} checked={!sumWounds} value="true" onChange={() => setState(false)} type={'radio'} /></label> <small>useful against many small things</small>
                </div>
                <div>
                    <label>Select Target Faction</label><br />
                    <select multiple={true} defaultValue={['marines']} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTargetFaction({ element: e.currentTarget })}>
                        <option value='marines'>Loyalist Marines</option>
                        <option value='knight'>Knights</option>
                        <option value='csm' >Chaos Marines</option>
                        <option value='ig' >Imperial Guard</option>
                        <option value='orks' >Orks</option>
                        <option value='deamons' >Deamons</option>
                    </select>
                </div>
                <div><br />
                    <label>
                        Select Target (hold ctrl/cmd to select multiple targets):
                    </label><br />
                    <select multiple={true} defaultValue={['0']} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => dispatch({ element: e.currentTarget })}>
                        {targets.map((t: any, i: number) => {
                            return (
                                <option key={i} value={i}>{t.name}</option>
                            );
                        })}
                    </select>
                    (this is a multiselect, initiate!)
                </div>
                <div>
                    <label><small>Hide Unchecked Weapons </small><input type={'checkbox'} checked={hideUncheckedWeapons} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHideUncheckedWeapons(!!e.currentTarget.checked)} name={'hideUncheckedWeapons'} /> </label>
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
            </div>
            <div style={{ margin: '3px', flexGrow: 1, fontSize: '12px', textAlign: 'right' }}>
                <p><small>Doctrine</small></p>
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