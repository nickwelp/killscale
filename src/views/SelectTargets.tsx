import React from 'react';
import AddTarget from './AddTarget';

const SelectTargets = ({ props }: any) => {
    const {
        targets,
        setTargetFaction,
        dispatch
    } = props;
    return (
        <div style={{ maxWidth: '900px', margin: '10px auto 10px auto', boxShadow: '2px 2px 5px #999', borderRadius: '3px', padding: '10px' }}>
            <h3 style={{ textAlign: 'center' }}>Select The Faction To Target, then Select the Units to Target.</h3>
            <p style={{ textAlign: 'center' }}><small>Units Added Directly via the "Add Target" button will persist despite changing target Factions.</small></p>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', margin: '5px' }}>
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