import React, { ChangeEvent, useState } from 'react';
import Histogram from './Histogram';


const KillScale = ({ data, i, shooter, modelCount }: any) => {
    const [showHistogram, updateShowHistogram] = useState(false);
    return (
        <div style={{ fontSize: '15px' }} key={i}>
            <small>{data.target}</small><br />
            <small>{data.pruned.worst}</small> - {data.pruned.lowerMedian} - <strong>{data.pruned.median}</strong> - {data.pruned.upperMedian} - <small>{data.pruned.best}</small><br />
            <span style={{ fontSize: '9px' }}><small>{data.raw.worst}</small> - {data.raw.lowerMedian} - <strong>{data.raw.median}</strong> - {data.raw.upperMedian} - <small>{data.raw.best}</small></span><br />
            <div style={{ display: 'table', textAlign: 'right', margin: 'auto' }}>
                <small style={{ display: 'table-row' }}>
                    <span style={{ fontSize: '9px', display: 'table-cell', paddingRight: '5px' }}>Cynical Outcome</span>
                    <span style={{ display: 'table-cell', fontWeight: 'bold' }}>{data.cynicalOutcome >= 0 ? data.cynicalOutcome : 0} </span>
                </small>
                <small style={{ display: 'table-row' }}>
                    <span style={{ fontSize: '9px', display: 'table-cell', paddingRight: '5px' }}>pts per mean</span>
                    <span style={{ display: 'table-cell' }}>{(Math.round((shooter.points * modelCount / data.mean) * 100) / 100)}</span>
                </small>
                <small style={{ display: 'table-row' }}>
                    <span style={{ fontSize: '9px', display: 'table-cell', paddingRight: '5px' }}>Mean</span>
                    <span style={{ display: 'table-cell' }}>{(Math.round(100 * data.mean) / 100)} </span>
                </small>
                <small style={{ display: 'table-row' }}>
                    <span style={{ fontSize: '9px', display: 'table-cell', paddingRight: '5px' }}>Standard Deviation</span>
                    <span style={{ display: 'table-cell' }}>{(Math.round(100 * data.standardDeviation) / 100)} </span>
                </small>
                <small style={{ display: 'table-row' }}>
                    <span style={{ fontSize: '9px', display: 'table-cell', paddingRight: '5px' }}>mode</span>
                    <span style={{ display: 'table-cell' }}>{data.mode.join(', ')}</span>
                </small>
            </div>
            <label style={{ marginRight: '15px', marginLeft: '15px', display: 'block', textAlign: 'left' }} >Show Histogram <input checked={showHistogram} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => updateShowHistogram(!!e.currentTarget.checked)} /> </label>
            {showHistogram && <Histogram set={data.set} setLength={data.raw.length} />}
        </div>);
};
export default KillScale;