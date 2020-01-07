import React, { ChangeEvent, useContext } from 'react';

import Display from './Display';
import HelpText from './HelpText';
import UIOptions from './UIOptions';



import { MyUserContext } from '../controllers/context/UserContext';
import Diagnostics from './Diagnostics';
import LoadData from './LoadData';
import SaveData from './SaveData';
import SelectAttackers from './SelectAttackers';
import SelectTargets from './SelectTargets';

import bootstrap from './theme/bootstrap.module.css';
import TargetAggregations from './TargetAggregations';



const Dashboard = () => {

    const {
        showDiagnostics, updateDiagnostics,
        sumWounds, setState,
        hideUncheckedWeapons, setHideUncheckedWeapons,
        showOptions, setShowOptions,
        showHelp, setShowHelp,
        showSaveData, setShowSaveData,
        showLoadData, setShowLoadData,
        chooseTargets, updateChooseTargets,
        showSelectAttackers, setShowSelectAttackers
    } = useContext(MyUserContext);

    return (
        <div >
            <div style={{ marginBottom: '10px' }} className={bootstrap['row']}>
                <label style={{ marginRight: '15px', marginLeft: '15px' }} >Show Options <input checked={showOptions} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowOptions(!!e.currentTarget.checked)} /> </label>
                <label style={{ marginRight: '15px' }}>Select Targets<input checked={chooseTargets} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => updateChooseTargets(!!e.currentTarget.checked)} /> </label>
                <label style={{ marginRight: '15px' }}>Select Attacking Units <input type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowSelectAttackers(!!e.currentTarget.checked)} /></label>
                <label style={{ marginRight: '15px' }}>Show Help <input checked={showHelp} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowHelp(!!e.currentTarget.checked)} /> </label>
                <label style={{ marginRight: '15px' }}>Save Data<input checked={showSaveData} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowSaveData(!!e.currentTarget.checked)} /> </label>
                <label style={{ marginRight: '15px' }}>Load Data<input checked={showLoadData} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowLoadData(!!e.currentTarget.checked)} /> </label>
                <label style={{ marginRight: '15px' }}>Diagnostics<input checked={showDiagnostics} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => updateDiagnostics(!!e.currentTarget.checked)} /> </label>
            </div>

            <div style={{ marginBottom: '10px', background: '#F0F0F0', padding: '3px' }} className={bootstrap['row']}>
                <label style={{ marginRight: '15px', marginLeft: '15px' }}>Hide Unchecked Weapons <input type={'checkbox'} checked={hideUncheckedWeapons} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHideUncheckedWeapons(!!e.currentTarget.checked)} name={'hideUncheckedWeapons'} /> </label>
                <div style={{ background: '#FFFFFF' }}><label>Count Total Wounds <input name={'deadModels'} checked={sumWounds} value="false" onChange={() => setState(true)} type={'radio'} /></label>
                    <label>Count Dead Models <input name={'deadModels'} checked={!sumWounds} value="true" onChange={() => setState(false)} type={'radio'} /></label><br />
                    {/* <p style={{ fontSize: '9px', margin: '7px' }}>Count Dead Models is good VS Hordes, while Count Wounds is better VS big things like Knights</p> */}
                </div>

            </div>
            {showHelp && <HelpText />}
            {showSelectAttackers &&
                <SelectAttackers />}
            {chooseTargets &&
                <SelectTargets />}
            {showOptions &&
                <UIOptions />}
            {showSaveData && <SaveData />}
            {showLoadData && <LoadData />}
            {showDiagnostics && <Diagnostics />}

            <TargetAggregations />
            <Display />
        </div >
    );
};

export default Dashboard;