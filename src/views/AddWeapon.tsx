import React, { useContext, useState } from 'react';

import { MyUserContext } from '../controllers/context/UserContext';
import { IWeaponProfile } from '../models/interfaces';

const AddTarget = () => {
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
        const FNP = parseInt((document.querySelector('[name=FNP]') ? document.querySelector('[name=FNP]').value : '7'), 10);
        // @ts-ignore
        const invuln = parseInt((document.querySelector('[name=invuln]') ? document.querySelector('[name=invuln]').value : '7'), 10);
        // @ts-ignore
        const save = parseInt((document.querySelector('[name=save]') ? document.querySelector('[name=save]').value : '3'), 10);
        // @ts-ignore
        const toughness = parseInt((document.querySelector('[name=toughness]') ? document.querySelector('[name=toughness]').value : '4'), 10);
        // @ts-ignore
        const woundsPerModel = parseInt((document.querySelector('[name=woundsPerModel]') ? document.querySelector('[name=woundsPerModel]').value : '1'), 10);
        // @ts-ignore
        const modelCount = parseInt((document.querySelector('[name=modelCount]') ? document.querySelector('[name=modelCount]').value : '1'), 10);
        // @ts-ignore
        const toHit = parseInt((document.querySelector('[name=toHit]') ? document.querySelector('[name=toHit]').value : '0'), 10);
        // // @ts-ignore
        // const points = parseInt((document.querySelector('[name=points]') ? document.querySelector('[name=points]').value : '100'), 10);
        // @ts-ignore
        const tags = (document.querySelector('[name=keywords]') ? document.querySelector('[name=keywords]').value : '100').split(',').map(e => e.trim());
        // const weapon: IWeaponProfile = {
        //     name,
        //     FNP,
        //     invuln,
        //     save,
        //     toughness,
        //     woundsPerModel,
        //     modelCount,
        //     toHit,
        //     // points,
        //     tags,
        // };
        // addUserCreatedWeaponProfiles(weapon);
        toggleViewAddWeaponProfile();
    };

    return (
        <div style={{ position: 'fixed', zIndex: 9, top: '0', left: '0', right: 0, bottom: 0, background: '#f2f2f2' }}>
            <div style={{ maxWidth: '500px', margin: '10% auto', boxShadow: '1px 1px 5px #999999', borderRadius: '3px', padding: '10px' }}>
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
                        <option value="d3()">d3</option>
                        <option value="d6()">d6</option>
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
                            <option value="d6()">d6</option>
                            <option value="d3()">d3</option>
                        </select>
                    </label>

                    {/*
    //     toHit: number;
    //     rerollHits?: boolean;
    //     rerollHitRollsOfOne?: boolean;
    //     rerollWounds?: boolean;
    //     rerollWoundRollsOfOne?: boolean;
    //     plusToHit?: number;
    //     plusToWound?: number;
    //     tags: string[];
    //     uniqueIdentifier?: string; */}


                    <label>Invuln ++<select name={'invuln'}>
                        <option value="7">None</option>
                        <option value="6">6++</option>
                        <option value="5">5++</option>
                        <option value="4">4++</option>
                        <option value="3">3++</option>
                        <option value="2">2++</option>
                    </select></label>
                    <label>Armor Save +<select name={'save'}>
                        <option value="7">7+ (ie none)</option>
                        <option value="6">6+</option>
                        <option value="5">5+</option>
                        <option value="4">4+</option>
                        <option value="3">3+</option>
                        <option value="2">2+</option>
                    </select></label>
                    <label>Toughness<select name={'toughness'}>
                        {options(10, 4)}
                    </select></label>
                    <label>Wounds Per model
                        <select name="woundsPerModel" >
                            {options(40, 1)}
                        </select>
                    </label>
                    <label>Model Count
                        <select name="modelCount" >
                            {options(40, 1)}
                        </select>
                    </label>
                    <label>To Hit (ie Plague Bearers being -2 to hit, usually 0)
                        <select name="toHit">
                            <option value="0">0</option>
                            <option value="-1">-1</option>
                            <option value="-2">-2</option>
                            <option value="-3">-3</option>
                            <option value="-4">-4</option>
                        </select>
                    </label>
                    {/* <label>Points (approximate)
                        <select name="points" >
                            {options(600, 100)}
                        </select>
                    </label> */}
                    <label>
                        Keywords (comma seperate caps don't matter) <br />
                        ie "Vehicle, Fly, rat" <br />
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
                        Save Target
                    </button>
                </div>
            </div>
        </div>


    );
};

export default AddTarget;