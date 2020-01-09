import React, { useContext, useState } from 'react';

import { MyUserContext } from '../controllers/context/UserContext';
import { ITarget } from '../models/interfaces';

const AddTarget = () => {
    const [viewAddTarget, updateViewAddTarget] = useState(false);
    const toggleViewAddTarget = () => updateViewAddTarget(!viewAddTarget);

    const { addUserCreatedTarget } = useContext(MyUserContext);

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
    if (!viewAddTarget) {
        return (
            <button
                onClick={toggleViewAddTarget}
                onKeyPress={onKeyPress}
            >
                Add Your Own Target
            </button>
        );
    }



    const saveTarget = () => {
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
        const target: ITarget = {
            name,
            FNP,
            invuln,
            save,
            toughness,
            woundsPerModel,
            modelCount,
            toHit,
            // points,
            tags,
        };
        addUserCreatedTarget(target);
        toggleViewAddTarget();
    };

    return (
        <div >
            <div style={{ maxWidth: '500px', margin: '10% auto', boxShadow: '1px 1px 5px #999999', borderRadius: '3px', padding: '10px' }}>
                <p><strong>Add Target Profile</strong></p>
                <form style={{ display: 'flex', flexFlow: 'column nowrap' }}>
                    <label>Name of Unit <input type={'text'} name={'name'} id={'name'} /></label>
                    <label>FNP +++<select name={'FNP'}>
                        <option value="7">None</option>
                        <option value="6">6+++</option>
                        <option value="5">5+++</option>
                        <option value="4">4+++</option>
                        <option value="3">3+++</option>
                        <option value="2">2+++</option>
                    </select></label>
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
                        <option value="1">1+</option>
                        <option value="0">0+</option>
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
                        onClick={toggleViewAddTarget}
                        onKeyPress={onKeyPress}
                    >
                        Cancel
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                        onClick={saveTarget}
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