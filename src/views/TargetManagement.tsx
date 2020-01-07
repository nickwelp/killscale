import React, { useState, ChangeEvent } from 'react';
import CreateSet from '../controllers/Shooting';
import KillScale from './KillScale';


const TargetManagement = ({
    shooter,
    weapons,
    targets,
    sumWounds,
    modelCount,
    rerollProfile,
    doctrine,
    iterations,
    shotsFired }: any) => {

    const [hasCover, updateHasCover] = useState(false);
    const [localSumWounds, updateLocalSumWounds] = useState(false);
    const [showHistogram, updateShowHistogram] = useState(false);
    // const [showMenu, updateShowMenu] = useState(false);
    targets[0].inCover = hasCover;
    const [dataSet] = CreateSet({
        shooter,
        weapons,
        targets,
        sumWounds: (localSumWounds || sumWounds),
        modelCount,
        rerollProfile,
        doctrine,
        iterations,
        shotsFired
    });

    return (
        <div style={{ background: '#fff', marginBottom: '10px', borderRadius: '5px', boxShadow: '1px 1px 3px aliceblue' }}>
            <div style={{ display: 'flex', flexFlow: 'column', fontSize: '9px', textAlign: 'right', marginLeft: '267px', marginBottom: '-83px', position: 'relative', bottom: '-86px' }}>
                <label style={{ display: 'table-cell', fontSize: '9px' }} >Show Histogram <input checked={showHistogram} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => updateShowHistogram(!!e.currentTarget.checked)} /> </label>
                <label style={{ display: 'table-cell', fontSize: '9px' }}>Sum Wounds <input checked={localSumWounds} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => updateLocalSumWounds(!!e.currentTarget.checked)} /> </label>
                <label style={{ display: 'table-cell', fontSize: '9px' }}>In Cover<input checked={hasCover} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => updateHasCover(!!e.currentTarget.checked)} /> </label>
            </div>
            <KillScale data={dataSet} i={1} shooter={shooter} modelCount={modelCount} showHistogram={showHistogram} />

        </div>
    );
};


export default TargetManagement;