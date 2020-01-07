
import React from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

import { chartColors } from '../theme/chartColors';

// const data = [{ x: 100, y: 200, z: 200 }, { x: 120, y: 100, z: 260 },
// { x: 170, y: 300, z: 400 }, { x: 140, y: 250, z: 280 },
// { x: 150, y: 400, z: 500 }, { x: 110, y: 280, z: 200 }]
interface ITargetSet {
    set: any[];
}

interface IProps {
    targetSets: ITargetSet[];
    targetNames: string[];
    xAxis: string;
    yAxis: string;
}

const scatterPlotShapes: ['circle', 'triangle', 'star'] = ['circle', 'triangle', 'star'];


const ScatterPlot = ({ targetSets, xAxis, yAxis, targetNames }: IProps) => {
    const scatterElement = () => { //
        // @ts-ignore
        return targetSets.map(({ set }, i) => {
            const shape = scatterPlotShapes[i % scatterPlotShapes.length];
            return (
                <Scatter
                    key={i}
                    name={targetNames[i]}
                    // @ts-ignore
                    data={targetSets[i]}

                    fill={chartColors(targetSets.length, i)}
                    shape={shape}
                />);
        });

    }

    return (
        <ScatterChart width={400} height={400} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid />
            <XAxis dataKey={'x'} type="number" label={'mean'} name={xAxis} unit='' />
            {/* // @ts-ignore */}
            <YAxis dataKey={'ppm'} label={'points per mean'} type="number" name={yAxis} unit='' />
            <Legend />
            {scatterElement()}
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={(e: any) => {
                if (e.payload.length > 0) {
                    return (
                        <div style={{ backgroundColor: '#FFF', padding: '2px', fontSize: '10px', textAlign: 'right' }}>
                            <strong>{e.payload[0].payload.attacker}</strong> <br /> attacking <br /><strong>{e.payload[0].payload.target}</strong><br />
                            {xAxis}: {e.payload[0].payload.x} <br />
                            {yAxis}: {e.payload[0].payload.ppm}
                        </div>
                    );
                }
                return null;
            }} />
        </ScatterChart>
    );
};

export default ScatterPlot;
