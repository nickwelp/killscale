import React, { ChangeEvent, useContext, useState } from 'react';
import { MyUserContext } from '../controllers/context/UserContext';
import { IRerollSet, ITarget, IUnit, IWeaponProfile } from '../models/interfaces';
import ShootingProfile from './ShootingProfile';


const Display = () => {
    const {
        userCreatedWeaponProfiles,
        userCreatedAttackers,
        attackers = [],
        availableTargets,
        targetFaction,
        activeAttackersList,
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
        IFHeavyWeaponsSuperDoctrine,
        applyHeavyWeaponMinusOneToHit,
        iterations
    } = useContext(MyUserContext);

    const targets = availableTargets(targetFaction);
    const [showDebugger, updateShowDebugger] = useState(false);

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
    const profiles = [...attackers, ...userCreatedAttackers].map((shooter: IUnit, i: number) => {
        return ShootingProfile({
            shooter,
            targets: selectedTargets,
            sumWounds,
            rerollProfile,
            doctrine,
            uiSettings,
            hideProfile: !activeAttackersList.includes(i),
            iterations
        });
    });

    const debuggerAttackerPanel = () => userCreatedAttackers.map(({ name, balisticSkill, weaponSkill }: IUnit, i: number) => {
        return (<div key={i} style={{ padding: '10px', margin: '5px', maxWidth: '200px', borderLeft: '1px solid #AAA' }}>
            <h5>{name}</h5>
            <small>
                <br />balistic skill: {balisticSkill}+
                <br />weapon skill: {weaponSkill}+
            </small>
        </div>);
    });

    const debuggerWeaponPannel = () => userCreatedWeaponProfiles.map(({ name, rerollWounds, AP, damageKey, numberOfShots, numberOfShotsLabel, strength, plusToHit, plusToWound, rerollHitRollsOfOne, rerollHits, rerollWoundRollsOfOne, tags }: IWeaponProfile, index: number) => {
        return (<div key={index} style={{ padding: '10px', margin: '5px', maxWidth: '200px', borderLeft: '1px solid #AAA' }}>
            <h5>{name}</h5>
            <small>
                <br />damage: {damageKey},
                <br />AP: {AP}
                <br />numberOfShots {numberOfShotsLabel}
                <br />strength: {strength},
                <br />plusToHit: {plusToHit},
                <br />plusToWound: {plusToWound},
                <br />rerollHitRollsOfOne: {rerollHitRollsOfOne ? 'true' : 'false'},
                <br />rerollHits: {rerollHits ? 'true' : 'false'},
                <br />rerollWoundRollsOfOne: {rerollWoundRollsOfOne ? 'true' : 'false'},
                <br />rerollWounds: {rerollWounds ? 'true' : 'false'},
                <br />{tags ? 'tags: ' + tags.join(', ') : ''}
            </small>
        </div>);
    });
    const debuggerPannel = () => selectedTargets.map(({ name, FNP, invuln, save, toughness, woundsPerModel, toHit, modelCount, points, tags }: ITarget, index: number) => {
        return (<div key={index} style={{ padding: '10px', margin: '5px', maxWidth: '200px', borderLeft: '1px solid #AAA' }}>
            <h5>{name}</h5>
            <small>
                {'FNP: ' + FNP} <br />
                {'invuln: ' + invuln} <br />
                {'save: ' + save}  <br />
                {'toughness: ' + toughness} <br />
                {'woundsPerModel: ' + woundsPerModel} <br />
                {'modelCount: ' + modelCount} <br />
                {'toHit: ' + toHit} <br />
                {'points: ' + points}<br />
                {tags ? 'tags: ' + tags.join(', ') : ''}
            </small>
        </div>);
    });


    return (
        <>
            <div><label >Show Debugger Inforamtion<input checked={showDebugger} type={'checkbox'} onChange={(e: ChangeEvent<HTMLInputElement>) => updateShowDebugger(!!e.currentTarget.checked)} /> </label> </div>
            {showDebugger &&
                <>
                    <div style={{ display: 'flex', flexFlow: 'row wrap' }}>{debuggerPannel()}</div>
                    <div style={{ display: 'flex', flexFlow: 'row wrap', margin: '10px' }}>{debuggerWeaponPannel()}</div>
                    <div style={{ display: 'flex', flexFlow: 'row wrap', margin: '10px' }}>{debuggerAttackerPanel()}</div>
                </>}
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} >
                {profiles}
            </div>
        </>
    );
};

export default Display;