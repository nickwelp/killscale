import React, { useContext, ChangeEvent } from 'react';
import { MyUserContext } from '../controllers/context/UserContext';
import { ITarget, IUnit, IWeaponProfile } from '../models/interfaces';
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
        showDebugger
    } = useContext(MyUserContext);

    const targets = availableTargets(targetFaction);
    const selectedTargets: ITarget[] = targets.filter((_: ITarget, i: number) => targetList.includes(i));



    const profiles = [...attackers, ...userCreatedAttackers].map((shooter: IUnit, i: number) => {
        return ShootingProfile({
            shooter,
            targets: selectedTargets,
            hideProfile: !activeAttackersList.includes(i),
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
                <input type={'text'} name={'pointsAssigner'} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    points = parseInt(e.currentTarget.value);
                }} />
                <br />
                {tags ? 'tags: ' + tags.join(', ') : ''}
            </small>
        </div>);
    });


    return (
        <>
            {showDebugger &&
                <>
                    <div style={{ display: 'flex', flexFlow: 'row wrap' }}>{debuggerPannel()}</div>
                    <div style={{ display: 'flex', flexFlow: 'row wrap', margin: '10px' }}>{debuggerWeaponPannel()}</div>
                    <div style={{ display: 'flex', flexFlow: 'row wrap', margin: '10px' }}>{debuggerAttackerPanel()}</div>
                </>}
            <div style={{ background: '#F2F2F2' }}>
                <div style={{ padding: '2px 2px 10px 10px', marginBottom: '0', display: 'flex', flexFlow: 'row', justifyContent: 'space-between' }}>
                    <h2>Dashboard</h2>
                    <label></label>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', background: '#FFFFFF', margin: '10px' }} >
                    {profiles}
                </div>
            </div>
        </>
    );
};

export default Display;