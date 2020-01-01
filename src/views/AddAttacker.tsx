import React, { useContext, useState } from 'react';

import { MyUserContext } from '../controllers/context/UserContext';
import { IUnit, IWeaponProfile } from '../models/interfaces';

const AddAttacker = () => {
    const [viewAddAttackerProfile, updateViewAddAttackerProfile] = useState(false);
    const toggleViewAddAttackerProfile = () => updateViewAddAttackerProfile(!viewAddAttackerProfile);

    const { addUserCreatedAttacker, userCreatedWeaponProfiles } = useContext(MyUserContext);

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

    const weaponOptions = (userCreatedWeaponProfiles: IWeaponProfile[]) => {
        return userCreatedWeaponProfiles.map((weapon, i) => {
            return (<option key={i} value={i}>{weapon.name}</option>);
        });
    };

    if (!viewAddAttackerProfile) {
        return (
            <button
                onClick={toggleViewAddAttackerProfile}
                onKeyPress={onKeyPress}
            >
                Add Your Own Attacking Unit
            </button>
        );
    }



    const saveAttackerProfile = () => {
        // @ts-ignore
        const name = (document.querySelector('[name=name]') ? document.querySelector('[name=name]').value : '');
        // @ts-ignore
        const balisticSkill = (document.querySelector('[name=balisticSkill]') ? document.querySelector('[name=balisticSkill]').value : '');
        // @ts-ignore
        const weaponSkill = (document.querySelector('[name=weaponSkill]') ? document.querySelector('[name=weaponSkill]').value : '');
        // @ts-ignore
        const description = (document.querySelector('[name=description]') ? document.querySelector('[name=description]').value : '');
        // @ts-ignore
        const points = parseInt((document.querySelector('[name=points]') ? document.querySelector('[name=points]').value : ''), 10);
        // @ts-ignore
        const modelCountPerUnit = parseInt((document.querySelector('[name=modelCountPerUnit]') ? document.querySelector('[name=modelCountPerUnit]').value : ''), 10);
        // @ts-ignore
        const woundsPerModel = parseInt((document.querySelector('[name=woundsPerModel]') ? document.querySelector('[name=woundsPerModel]').value : ''), 10);
        const weaponsElement = document.querySelector('[name=weapons]');
        // @ts-ignore
        const weaponIndexes = Array.from(weaponsElement.querySelectorAll('option:checked'), e => +e.value);
        const weapons = userCreatedWeaponProfiles.filter((e: IWeaponProfile, i: number) => weaponIndexes.includes(i));
        // @ts-ignore
        const tags = (document.querySelector('[name=keywords]') ? document.querySelector('[name=keywords]').value : '100').split(',').map(e => e.trim());
        const moreTags = document.querySelector('[name=tags]');
        // @ts-ignore
        const moreTagsValues = Array.from(moreTags.querySelectorAll('option:checked'), e => e.value);
        tags.push(...moreTagsValues);
        const attacker: IUnit = {
            name,
            balisticSkill,
            weaponSkill,
            tags,
            description,
            modelCountPerUnit,
            points,
            weapons,
            woundsPerModel,
            weaponIndexes
        };
        addUserCreatedAttacker(attacker);
        toggleViewAddAttackerProfile();
    };

    return (
        <div >
            <div style={{ maxWidth: '500px', margin: '10% auto', boxShadow: '1px 1px 5px #999999', borderRadius: '3px', padding: '10px', textAlign: 'right' }}>
                <p><strong>Add Attacker Profile</strong></p>
                <form style={{ display: 'flex', flexFlow: 'column nowrap' }}>
                    <label>Name of Unit <input type={'text'} name={'name'} id={'name'} /></label>
                    <label>Balistic Skill
                        <select name="balisticSkill">
                            <option value="7">7+</option>
                            <option value="6">6+</option>
                            <option value="5">5+</option>
                            <option value="4" selected={true}>4+</option>
                            <option value="3">3+</option>
                            <option value="2">2+</option>
                            <option value="1">1+</option>
                        </select>
                    </label>
                    <label>Weapon Skill
                        <select name="weaponSkill">
                            <option value="7">7+</option>
                            <option value="6">6+</option>
                            <option value="5">5+</option>
                            <option value="4" selected={true}>4+</option>
                            <option value="3">3+</option>
                            <option value="2">2+</option>
                            <option value="1">1+</option>
                        </select>
                    </label>
                    <label>Description: (not really used) <input type="text" name="description" /></label>
                    <label>Number of Models Per Unit (used just for calculating Crimson Fists benefits, like put 5 for 5 intercessors)
                        <select name="modelCountPerUnit">
                            {options(40, 1)}
                        </select>
                    </label>
                    <label>Points: (used for approximating points per unit of damage produced)
                        <select name="points">
                            {options(600, 100)}
                        </select>
                    </label>
                    <label>
                        Wounds per Model (not really used yet)
                        <select name="woundsPerModel">
                            {options(40, 1)}
                        </select>
                    </label>

                    <label>
                        Weapons (multiselect)
                        <select multiple={true} name="weapons">
                            {weaponOptions(userCreatedWeaponProfiles)}
                        </select>
                    </label>

                    <label>
                        Keywords  <br />
                        <select name={'tags'} multiple={true}>
                            <option value={'fly'}>fly</option>
                            <option value={'hover'}>hover</option>
                            <option value={'infantry'}>infantry</option>
                            <option value={'vehicle'}>vehicle</option>
                        </select><br />
                        Add Your Own: (comma seperate) <br />
                        ie "Vehicle, Fly, rat" <br />
                        <input name={'keywords'} type="text" />
                    </label>
                </form>


                <div>
                    <button
                        onClick={toggleViewAddAttackerProfile}
                        onKeyPress={onKeyPress}
                    >
                        Cancel
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                        onClick={saveAttackerProfile}
                        onKeyPress={onKeyPress}
                    >
                        Save Attacker
                    </button>
                </div>
            </div>
        </div>


    );
};

export default AddAttacker;