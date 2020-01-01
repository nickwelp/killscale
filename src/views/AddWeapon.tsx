import React, { useContext, useState } from 'react';

import { MyUserContext } from '../controllers/context/UserContext';
import { decodeRollsForSavingState } from '../controllers/util';
import { IWeaponProfile } from '../models/interfaces';

const AddWeapon = () => {
    const [viewAddWeaponProfile, updateViewAddWeaponProfile] = useState(false);
    const toggleViewAddWeaponProfile = () => updateViewAddWeaponProfile(!viewAddWeaponProfile);

    const { addUserCreatedWeaponProfiles } = useContext(MyUserContext);

    const onKeyPress = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        const code = event.charCode || event.keyCode;
        if ((code === 32) || (code === 13)) {
            event.currentTarget.click();
        }
    };
    const options = (n: number = 30, d: number = 1) => {
        return Array(n).fill('').map((e, i) => {
            return (<option key={i} value={i} selected={i === d ? true : false}>{i}</option>);
        });
    };
    if (!viewAddWeaponProfile) {
        return (
            <button
                onClick={toggleViewAddWeaponProfile}
                onKeyPress={onKeyPress}
            >
                Add Your Own Weapon Profile
            </button>
        );
    }



    const saveWeaponProfile = () => {
        // @ts-ignore
        const name = (document.querySelector('[name=name]') ? document.querySelector('[name=name]').value : '');
        // @ts-ignore
        const type = (document.querySelector('[name=type]') ? document.querySelector('[name=type]').value : '');
        // @ts-ignore
        const numberOfShotsLabel = (document.querySelector('[name=numberOfShots]') ? document.querySelector('[name=numberOfShots]').value : '1');
        // @ts-ignore
        const AP = parseInt((document.querySelector('[name=AP]') ? document.querySelector('[name=AP]').value : '1'), 10);
        // @ts-ignore
        const strength = parseInt((document.querySelector('[name=strength]') ? document.querySelector('[name=strength]').value : '1'), 10);
        // @ts-ignore
        const damageKey = (document.querySelector('[name=damage]') ? document.querySelector('[name=damage]').value : '1');
        // @ts-ignore
        const rerollHits = (document.querySelector('[name=rerollHits]') ? 'true' === document.querySelector('[name=rerollHits]').value : false);
        // @ts-ignore
        const rerollHitRollsOfOne = (document.querySelector('[name=rerollHitRollsOfOne]') ? 'true' === document.querySelector('[name=rerollHitRollsOfOne]').value : false);
        // @ts-ignore
        const rerollWounds = (document.querySelector('[name=rerollWounds]') ? 'true' === document.querySelector('[name=rerollWounds]').value : false);
        // @ts-ignore
        const rerollWoundRollsOfOne = (document.querySelector('[name=rerollWoundRollsOfOne]') ? 'true' === document.querySelector('[name=rerollWoundRollsOfOne]').value : false);
        // @ts-ignore
        const plusToHit = parseInt((document.querySelector('[name=plusToHit]') ? document.querySelector('[name=plusToHit]').value : '0'), 10);
        // @ts-ignore
        const plusToWound = parseInt((document.querySelector('[name=plusToWound]') ? document.querySelector('[name=plusToWound]').value : '0'), 10);
        // @ts-ignore
        const tags = (document.querySelector('[name=keywords]') ? document.querySelector('[name=keywords]').value : '100').split(',').map(e => e.trim());
        const moreTags = document.querySelector('[name=tags]');
        // @ts-ignore
        const moreTagsValues = Array.from(moreTags.querySelectorAll('option:checked'), e => e.value);
        tags.push(...moreTagsValues);
        const numberOfShots = decodeRollsForSavingState(numberOfShotsLabel);
        const damage = decodeRollsForSavingState(damageKey);

        const weapon: IWeaponProfile = {
            name,
            type,
            AP,
            damage,
            damageKey,
            numberOfShots,
            numberOfShotsLabel,
            strength,
            tags,
            plusToHit,
            plusToWound,
            rerollHitRollsOfOne,
            rerollHits,
            rerollWoundRollsOfOne,
            rerollWounds
        };
        addUserCreatedWeaponProfiles(weapon);
        toggleViewAddWeaponProfile();
    };

    return (
        <div >
            <div style={{ maxWidth: '500px', margin: '10% auto', boxShadow: '1px 1px 5px #999999', borderRadius: '3px', padding: '10px', textAlign: 'right' }}>
                <p><strong>Add Weapon Profile</strong></p>
                <form style={{ display: 'flex', flexFlow: 'column nowrap' }}>
                    <label>Name of Unit <input type={'text'} name={'name'} id={'name'} /></label>
                    <label>Weapon Type
                        <select name="type">
                            <option value="Rapid Fire">Rapid Fire</option>
                            <option value="Assault">Assault</option>
                            <option value="Heavy">Heavy</option>
                            <option value="Melee">Melee</option>
                        </select>
                    </label>
                    <label>Number of Shots <small>If Rapid Fire, add 2 profiles, one with 1 number of shots, and another with 2 (or 2 and 4, etc)</small>
                        <select name="numberOfShots">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="d3">d3</option>
                            <option value="d6">d6</option>
                        </select>
                    </label>

                    <label>AP<select name={'AP'}>
                        <option value="0">0</option>
                        <option value="1">-1</option>
                        <option value="2">-2</option>
                        <option value="3">-3</option>
                        <option value="4">-4</option>
                        <option value="5">-5</option>
                    </select></label>

                    <label>
                        Strength
                        <select name="strength">
                            {options(16, 4)}
                        </select>
                    </label>

                    <label>
                        Damage:
                        <select name="damage">
                            {options(10, 1)}
                            <option value="d6">d6</option>
                            <option value="d3">d3</option>
                        </select>
                    </label>


                    <label>
                        Does Weapon Reroll Hits? <select name="rerollHits">
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </label>


                    <label>
                        Does Weapon Reroll Hits of One? <select name="rerollHitRollsOfOne">
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </label>

                    <label>
                        Does Weapon Reroll Wounds <select name="rerollWounds">
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </label>
                    <label>
                        Does Weapon Reroll Wounds rolls of One? <select name="rerollWoundRollsOfOne">
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </label>
                    <label>
                        Modifier to Hit <select name="plusToHit">
                            <option value="-1">-1</option>
                            <option value="0" selected={true}>0</option>
                            <option value="1">+1</option>
                            <option value="2">+2</option>
                        </select>
                    </label>


                    <label>
                        Modifier to Wound <select name="plusToHit">
                            <option value="-1">-1</option>
                            <option value="0" selected={true}>0</option>
                            <option value="1">+1</option>
                            <option value="2">+2</option>
                        </select>
                    </label>
                    <label>
                        Keywords or Special Rules
                        <br />
                        <select name={'tags'} multiple={true}>
                            <option value={'bolter'}>bolter</option>
                            <option value={'autowounds on 6s to hit'}>autowounds on 6s to hit</option>
                            <option value={'mortal wound on 6+s to wound'}>mortal wound on 6+s to wound</option>
                            <option value={'mortal wound on unmodified 6s to wound'}>mortal wound on unmodified 6s to wound</option>
                            <option value={'+1 to hit vs fliers, -1 to hit vs all others'}>+1 to hit vs fliers, -1 to hit vs all others</option>
                            <option value={'wound rolls 6+s resolved at AP-3'}>wound rolls 6+s resolved at AP-3</option>
                            <option value={'wound rolls 6+s resolved at AP-4'}>wound rolls 6+s resolved at AP-4</option>
                        </select>
                        <br />Add Your Own: (comma seperate caps don't matter) <br />
                        ie "Vehicle, Fly, rat, bolter" <br />
                        <input name={'keywords'} type="text" />
                    </label>
                </form>


                <div>
                    <button
                        onClick={toggleViewAddWeaponProfile}
                        onKeyPress={onKeyPress}
                    >
                        Cancel
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                        onClick={saveWeaponProfile}
                        onKeyPress={onKeyPress}
                    >
                        Save Weapon
                    </button>
                </div>
            </div>
        </div>


    );
};

export default AddWeapon;