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
        showSelectAttackers, setShowSelectAttackers,
        showAggregations, setShowAggregations,
        showDebugger, updateShowDebugger
    } = useContext(MyUserContext);

    return (
        <div >
            <div style={{ marginBottom: '0px' }} className={bootstrap['row'] + ' ' + bootstrap['mx-0']}>
                <label className={'optionsTabs'} style={{ marginRight: '15px', marginLeft: '15px' }} >
                    <input checked={showOptions} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowOptions(!!e.currentTarget.checked)} />
                    <span>Show Options</span>
                </label>
                <label className={'optionsTabs'} style={{ marginRight: '15px' }}>
                    <input checked={showAggregations} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowAggregations(!!e.currentTarget.checked)} />
                    <span>
                        Show Aggregations
                    </span>
                </label>
                <label className={'optionsTabs'} style={{ marginRight: '15px' }}>
                    <input checked={chooseTargets} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => updateChooseTargets(!!e.currentTarget.checked)} />
                    <span>
                        Select Targets
                    </span></label>
                <label className={'optionsTabs'} style={{ marginRight: '15px' }}>
                    <input type={'checkbox'} checked={showSelectAttackers} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowSelectAttackers(!!e.currentTarget.checked)} />
                    <span>
                        Select Attacking Units
                    </span></label>
                <label className={'optionsTabs'} style={{ marginRight: '15px' }}>
                    <input checked={showHelp} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowHelp(!!e.currentTarget.checked)} />
                    <span>
                        Show Help
                    </span></label>
                <label className={'optionsTabs'} style={{ marginRight: '15px' }}>
                    <input checked={showSaveData} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowSaveData(!!e.currentTarget.checked)} />
                    <span>
                        Save Data
                    </span></label>
                <label className={'optionsTabs'} style={{ marginRight: '15px' }}>
                    <input checked={showLoadData} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => setShowLoadData(!!e.currentTarget.checked)} />
                    <span>
                        Load Data
                    </span></label>
                <label className={'optionsTabs'} style={{ marginRight: '15px' }}>
                    <input checked={showDiagnostics} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => updateDiagnostics(!!e.currentTarget.checked)} />
                    <span>
                        Diagnostics
                    </span></label>
                <label className={'optionsTabs'} style={{ marginRight: '15px' }}>
                    <input checked={showDebugger} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => updateShowDebugger(!!e.currentTarget.checked)} />
                    <span>
                        Show Debugger Inforamtion
                    </span>
                </label>
            </div>

            <div style={{ marginBottom: '10px', background: '#F0F0F0', padding: '3px' }} className={bootstrap['row'] + ' ' + bootstrap['mx-0']}>
                <label style={{ marginRight: '15px', marginLeft: '15px' }}>Hide Unchecked Weapons <input type={'checkbox'} checked={hideUncheckedWeapons} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHideUncheckedWeapons(!!e.currentTarget.checked)} name={'hideUncheckedWeapons'} /> </label>
                <div style={{ background: '#FFFFFF' }}><label>Count Total Wounds <input name={'deadModels'} checked={sumWounds} value="false" onChange={() => setState(true)} type={'radio'} /></label>
                    <label>Count Dead Models <input name={'deadModels'} checked={!sumWounds} value="true" onChange={() => setState(false)} type={'radio'} /></label><br />
                    {/* <p style={{ fontSize: '9px', margin: '7px' }}>Count Dead Models is good VS Hordes, while Count Wounds is better VS big things like Knights</p> */}
                </div>
            </div>
            {showHelp && <HelpText />}
            {showSelectAttackers && <SelectAttackers />}
            {chooseTargets && <SelectTargets />}
            {showOptions && <UIOptions />}
            {showSaveData && <SaveData />}
            {showLoadData && <LoadData />}
            {showDiagnostics && <Diagnostics />}
            {showAggregations && <TargetAggregations />}
            <Display />
        </div >
    );
};

export default Dashboard;