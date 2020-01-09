import React, { useContext, ChangeEvent } from 'react';
import AddTarget from './AddTarget';
import { MyUserContext } from '../controllers/context/UserContext';

const SelectTargets = () => {
    const {
        targetFaction,
        setTargetFaction,
        dispatch,
        availableTargets,
        chooseTargets, updateChooseTargets,
    } = useContext(MyUserContext);

    const targets = availableTargets(targetFaction);
    return (
        <div style={{ background: '#F2F2F2', padding: '10px', marginBottom: '10px' }}>
            <div style={{ background: '#F2F2F2', padding: '2px 2px 10px 0px', marginBottom: '0', display: 'flex', flexFlow: 'row', justifyContent: 'space-between' }}>
                <h2>Target Selection </h2>
                <label>close Target Selection<input checked={chooseTargets} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => updateChooseTargets(!!e.currentTarget.checked)} /></label>
            </div>
            <h4>Select The Faction To Target, then Select the Units to Target.</h4>
            <p><small>Units Added Directly via the "Add Target" button will persist despite changing target Factions.</small></p>
            <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around', margin: '5px' }}>
                <div>
                    <label>Select Target Faction</label><br />
                    <select multiple={true} defaultValue={targetFaction} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTargetFaction({ element: e.currentTarget })}>
                        <option value="marines">Loyalist Marines</option>
                        <option value="knight">Knights</option>
                        <option value="csm" >Chaos Marines</option>
                        <option value="ig" >Imperial Guard</option>
                        <option value="orks" >Orks</option>
                        <option value="deamons" >Deamons</option>
                    </select>
                </div>
                <div>
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
                </div>
            </div>
            <div style={{ textAlign: 'center' }}>
                <AddTarget />
            </div>
        </div>);
};

export default SelectTargets;