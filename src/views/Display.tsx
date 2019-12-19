import React, { ChangeEvent, useState } from 'react';

import { IRerollSet, ITarget, IUnit } from '../models/interfaces';
import ShootingProfile from './ShootingProfile';

const Display = ({ props }: any) => {
    const [showDebugger, updateShowDebugger] = useState(false);
    const {
        targets,
        targetList,
        sumWounds,
        rerollHits,
        devastator,
        tactical,
        assault,
        explodingBolter6s,
        crimsonFistsPlusToHit,
        rerollHitRollsOfOne,
        rerollWounds,
        rerollWoundRollsOfOne,
        hideUncheckedWeapons,
        attackers,
        activeAttackersList,
        IFHeavyWeaponsSuperDoctrine,
        applyHeavyWeaponMinusOneToHit
    } = props;
    const selectedTargets: ITarget[] = targets.filter((_: ITarget, i: number) => targetList.includes(i));
    const uiSettings = {
        hideUncheckedWeapons
    };
    const rerollProfile: IRerollSet = {
        rerollHits,
        rerollHitRollsOfOne,
        rerollWounds,
        rerollWoundRollsOfOne,
        explodingBolter6s,
        crimsonFistsPlusToHit,
        IFHeavyWeaponsSuperDoctrine,
        applyHeavyWeaponMinusOneToHit
    };
    const doctrine = {
        devastator,
        tactical,
        assault
    };
    const profiles = attackers.map((shooter: IUnit, i: number) => {
        return ShootingProfile({
            shooter,
            targets: selectedTargets,
            sumWounds,
            rerollProfile,
            doctrine,
            uiSettings,
            hideProfile: !activeAttackersList.includes(i)
        });
    });

    const debuggerPannel = () => selectedTargets.map(({ name, FNP, invuln, save, toughness, woundsPerModel, toHit, modelCount, points, tags }: ITarget, index: number) => {
        return (<div key={index} style={{ padding: '10px', margin: '5px', maxWidth: '200px', borderLeft: '1px solid #AAA' }}>
            <h5>{name}</h5>
            {'FNP: ' + FNP} <br />
            {'invuln: ' + invuln} <br />
            {'save: ' + save}  <br />
            {'toughness: ' + toughness} <br />
            {'woundsPerModel: ' + woundsPerModel} <br />
            {'modelCount: ' + modelCount} <br />
            {'toHit: ' + toHit} <br />
            {'points: ' + points}<br />
            {tags ? 'tags: ' + tags.join(', ') : ''}
        </div>);
    });


    return (
        <>
            <div style={{ display: 'none' }}><label >Show Debugger Inforamtion<input checked={showDebugger} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => updateShowDebugger(!!e.currentTarget.checked)} /> </label> </div>
            {showDebugger &&
                <div style={{ display: 'flex', flexFlow: 'row wrap' }}>{debuggerPannel()}</div>}
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {profiles}
            </div>
        </>
    );
};

export default Display;