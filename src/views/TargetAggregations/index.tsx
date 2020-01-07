import React, { useContext, useState } from 'react';
import { MyUserContext } from '../../controllers/context/UserContext';

import ScatterPlot from './ScatterPlot';
import { ITarget } from '../../models/interfaces';



const TargetAggregations = () => {
    const { outcomesState, availableTargets, targetFaction, targetList } = useContext(MyUserContext);
    const apData: any = {};
    const availableTargetNames = availableTargets(targetFaction).filter((_: any, i: number) => targetList.includes(i)).map((tar: ITarget) => tar.name);

    const [selectedTargets, updatedSelectedTargets] = useState(availableTargetNames.map((_: string, i: number) => i));
    const targetOptions = () => availableTargetNames.map((name: string, index: number) => {
        return (<option value={index}>{name}</option>)
    });

    const availableTargetNamesFilter = availableTargetNames.filter((n: string, i: number) => selectedTargets.includes(i));

    if (outcomesState && outcomesState.length > 0) {
        outcomesState.filter((o: any) => !o.remove && availableTargetNamesFilter.includes(o.target)).forEach((outcomes: any) => {
            if (!apData[outcomes.target]) apData[outcomes.target] = {};
            apData[outcomes.target][outcomes.name] = { x: outcomes.mean, y: outcomes.standardDeviation, attacker: outcomes.name, target: outcomes.target, ppm: outcomes.ppm, cynicalOutcome: outcomes.cynicalOutcome };
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
    return (
        <div style={{ display: 'flex', flexFlow: 'row' }}>
            <ScatterPlot targetSets={dataSets} key={0} xAxis={'mean'} yAxis={'ppm'} targetNames={targetNames} />
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
    );

};

export default TargetAggregations;