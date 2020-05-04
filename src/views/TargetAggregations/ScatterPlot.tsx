
import React from 'react';
import {
    ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label
} from 'recharts';

import { chartColors } from '../theme/chartColors';

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
            <XAxis dataKey={xAxis} type="number" name={xAxis} unit=''>
                <Label
                    value={xAxis}
                    offset={-5}
                    position="bottom"
                    fill="#5A5B5E"
                    style={{
                        textAnchor: 'middle',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        fontFamily: 'sans-serif',
                        textTransform: 'Uppercase',
                        top: '0px'
                    }}
                />
            </XAxis>
            {/* // @ts-ignore */}
            <YAxis dataKey={yAxis} type="number" name={yAxis} unit=''>
                <Label
                    value={yAxis === 'ppm' ? 'points per mean' : yAxis}
                    offset={-1}
                    position="left"
                    fill="#5A5B5E"
                    style={{
                        textAnchor: 'middle',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        fontFamily: 'sans-serif',
                        textTransform: 'Uppercase',
                        transform: 'rotate(-90deg) translate(-195px,-142px)'
                    }}
                    angle={0}
                />
            </YAxis>
            <Legend />
            {scatterElement()}
            <Tooltip cursor={{ strokeDasharray: '3 3' }} content={(e: any) => {
                if (e.payload.length > 0) {
                    return (
                        <div style={{ backgroundColor: '#FFF', padding: '2px', fontSize: '10px', textAlign: 'right' }}>
                            <strong>{e.payload[0].payload.attacker}</strong> <br /> attacking <br /><strong>{e.payload[0].payload.target}</strong><br />
                            {xAxis}: {e.payload[0].payload[xAxis]} <br />
                            {yAxis}: {e.payload[0].payload[yAxis]}
                        </div>
                    );
                }
                return null;
            }} />
        </ScatterChart>
    );
};

export default ScatterPlot;
