import React, { useContext, useState, ChangeEvent } from 'react';
import { MyUserContext } from '../../controllers/context/UserContext';

import ScatterPlot from './ScatterPlot';
import { ITarget } from '../../models/interfaces';



const TargetAggregations = () => {
    const { outcomesState, availableTargets, targetFaction, targetList, showAggregations, setShowAggregations } = useContext(MyUserContext);
    const apData: any = {};
    const availableTargetNames = availableTargets(targetFaction).filter((_: any, i: number) => targetList.includes(i)).map((tar: ITarget) => tar.name);

    const [selectedTargets, updatedSelectedTargets] = useState(availableTargetNames.map((_: string, i: number) => i));
    const targetOptions = () => availableTargetNames.map((name: string, index: number) => {
        return (<option key={index} value={index}>{name}</option>)
    });

    const availableTargetNamesFilter = availableTargetNames.filter((n: string, i: number) => selectedTargets.includes(i));

    if (outcomesState && outcomesState.length > 0) {
        outcomesState.filter((o: any) => !o.remove && availableTargetNamesFilter.includes(o.target)).forEach((outcomes: any) => {
            if (!apData[outcomes.target]) apData[outcomes.target] = {};
            apData[outcomes.target][outcomes.name] = {
                mean: outcomes.mean,
                standardDeviation: outcomes.standardDeviation,
                attacker: outcomes.name,
                target: outcomes.target,
                ppm: outcomes.ppm,
                cynicalOutcome: outcomes.cynicalOutcome,
                mode: outcomes.mode
            };
        });
    }

    const dataSets: any[] = [];
    const targetNames: string[] = [];
    Object.keys(apData).forEach((key) => {
        const targetSet: any[] = [];
        Object.keys(apData[key]).forEach((k) => {
            targetSet.push(apData[key][k]);
        });
        dataSets.push(targetSet);
        targetNames.push(key);
    });

    const [yAxis, setYAxis] = useState('ppm');
    const [xAxis, setXAxis] = useState('mean');
    const updateYAxis = (e: React.ChangeEvent<HTMLInputElement>) => {
        const str = e.currentTarget.value;
        setYAxis(str);
    };
    const updateXAxis = (e: React.ChangeEvent<HTMLInputElement>) => {
        const str = e.currentTarget.value;
        setXAxis(str);
    };

    return (
        <>
            <div style={{ background: '#F2F2F2', padding: '2px 2px 10px 10px', marginBottom: '0', display: 'flex', flexFlow: 'row', justifyContent: 'space-between' }}>
                <h2 >Aggregations </h2>
                <label>close Aggregations<input checked={showAggregations} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowAggregations(!!e.currentTarget.checked)} /></label>
            </div>
            <div style={{ display: 'flex', flexFlow: 'row', background: '#F2F2F2', marginBottom: '10px' }}>
                <div style={{ display: 'flex', flexFlow: 'row', marginTop: '206px', transform: 'rotate(-90deg)', whiteSpace: 'nowrap', width: '40px', position: 'relative', top: '119px', height: '10px' }}>
                    <label className={'tabbedCheck'}><input name={'yAxis'} type={'radio'} onChange={updateYAxis} value={'ppm'} checked={'ppm' === yAxis} /> <span>ppm</span> </label>
                    <label className={'tabbedCheck'}><input name={'yAxis'} type={'radio'} onChange={updateYAxis} value={'mode'} checked={'mode' === yAxis} /> <span> mode</span> </label>
                    <label className={'tabbedCheck'}><input name={'yAxis'} type={'radio'} onChange={updateYAxis} value={'standardDeviation'} checked={'standardDeviation' === yAxis} /> <span>standardDeviation </span></label>
                    <label className={'tabbedCheck'}><input name={'yAxis'} type={'radio'} onChange={updateYAxis} value={'mean'} checked={'mean' === yAxis} /> <span> mean</span> </label>
                </div>
                <div style={{ display: 'flex', flexFlow: 'column', paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', flexFlow: 'row' }}>
                        <label className={'tabbedCheck'}><input name={'xAxis'} type={'radio'} onChange={updateXAxis} value={'ppm'} checked={'ppm' === xAxis} /> <span>ppm</span> </label>
                        <label className={'tabbedCheck'}><input name={'xAxis'} type={'radio'} onChange={updateXAxis} value={'mode'} checked={'mode' === xAxis} /><span> mode</span> </label>
                        <label className={'tabbedCheck'}><input name={'xAxis'} type={'radio'} onChange={updateXAxis} value={'standardDeviation'} checked={'standardDeviation' === xAxis} /><span> standardDeviation </span></label>
                        <label className={'tabbedCheck'}><input name={'xAxis'} type={'radio'} onChange={updateXAxis} value={'mean'} checked={'mean' === xAxis} /><span>mean </span></label>
                    </div>
                    <div style={{ display: 'flex', flexFlow: 'row' }}>
                        <div style={{ background: '#FFFFFF', borderRadius: '4px' }}>
                            <ScatterPlot targetSets={dataSets} key={0} xAxis={xAxis} yAxis={yAxis} targetNames={targetNames} />
                        </div>
                        <div style={{ display: 'flex', flexFlow: 'column', margin: '5px' }}>
                            <small>Targets</small>
                            <select defaultValue={selectedTargets} name={'selectTargetAggregations'} onChange={
                                () => {
                                    const selectElement = document.querySelector('[name=selectTargetAggregations]');
                                    // @ts-ignore
                                    const selectIndexes = Array.from(selectElement.querySelectorAll('option:checked'), e => +e.value);
                                    updatedSelectedTargets(selectIndexes);
                                }
                            } multiple={true}>
                                {targetOptions()}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

};

export default TargetAggregations;