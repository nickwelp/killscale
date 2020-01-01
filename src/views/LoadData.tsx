import React from 'react';

const LoadData = () => {
    return (
        <div style={{ margin: 'auto', width: '95%' }}>
            <h3>How to Load Data</h3>
            <p>These three text boxes represent the saved data of Targets, Weapon Profiles, and Attacker Profiles that users custom create.</p>
            <p><strong>AFTER LOADING DATA YOU NEED TO RELOAD THE WEB BROWSER. THE LAST BUTTON WILL DO THAT.</strong></p>
            <p>To input Target Data, paste the text blob into this textarea input, and click the button to save. This will overwrite your localstorage regarding custom Targets with the data you paste in. It needs to be JSON formatted and it needs to match the output of the Save interface. Praise the Emperor and hold on to your butt.</p>
            <p>After updating these fields you need to reload the webpage for it to take effect. Hence the last button in this list reloads the webpage.</p>
            <label>TARGET DATA <input name={'targetInput'} id={'targetInput'} /></label>
            <button
                onClick={() => {
                    // @ts-ignore
                    const a = document.getElementById('targetInput').value;
                    try {
                        const t = JSON.parse(a);
                        if (typeof t === 'object') {
                            localStorage.removeItem('userCreatedTargets');
                            localStorage.setItem('userCreatedTargets', a);
                            alert('Targets Updated');
                        }
                    } catch (e) {
                        alert('Thats not valid JSON u bum');
                    }
                }}
            >PROCESS TARGET DATA</button>
            <br />
            <br />
            <p>Keep in mind Attacker and Weapon Profile data usually will need to be paired up lest something f-ed up happens, like a lictor pops out of your toliet.</p>
            <label>WEAPON PROFILE DATA <input name={'weaponInput'} id={'weaponInput'} /></label>
            <button
                onClick={() => {
                    // @ts-ignore
                    const a = document.getElementById('weaponInput').value;
                    try {
                        const t = JSON.parse(a);
                        if (typeof t === 'object') {
                            localStorage.removeItem('userCreatedWeaponProfiles');
                            localStorage.setItem('userCreatedWeaponProfiles', a);
                            alert('Weapons Updated');
                        }
                    } catch (e) {
                        alert('Thats not valid JSON u bum');
                    }
                }}
            >PROCESS WEAPON PROFILE DATA</button>
            <br />
            <label>ATTACKER DATA <input name={'attackerInput'} id={'attackerInput'} /></label>
            <button
                onClick={() => {
                    // @ts-ignore
                    const a = document.getElementById('attackerInput').value;
                    try {
                        const t = JSON.parse(a);
                        if (typeof t === 'object') {
                            localStorage.removeItem('userCreatedAttackers');
                            localStorage.setItem('userCreatedAttackers', a);
                            alert('Attackers Updated');
                        }
                    } catch (e) {
                        alert('Thats not valid JSON u bum');
                    }
                }}
            >PROCESS ATTACKER DATA</button>
            <br />
            <br /><br />
            <button onClick={() => { window.location.reload(); }}>
                Reload App With Updated Data
    </button>
        </div>

    );
};

export default LoadData;

