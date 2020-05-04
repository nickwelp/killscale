import React from 'react';

const SaveData = () => {
    const selectText = (a: string) => {
        const input = document.getElementById(a);
        // @ts-ignore
        input.focus();
        // @ts-ignore
        input.select();
    };

    const targetCache = localStorage.getItem('userCreatedTargets');
    const attackerCache = localStorage.getItem('userCreatedAttackers');
    const weaponCache = localStorage.getItem('userCreatedWeaponProfiles');

    return (
        <div style={{ margin: 'auto', width: '95%' }}>
            <h3>How to Save/Back Up Data</h3>
            <p>These three text boxes represent the saved data of Targets, Weapon Profiles, and Attacker Profiles that users custom create.</p>
            <p>While you can pass targets around freely, you really need to pair Weapon Profiles with Attacker Profiles. Or else you end up with nonense like Guardians shooting Lasrifles.</p>
            <p>Hopefully this should allow armies to share data with each other, so if some kind soul was nice enough to enter all the Target data for the Imperial Guard, you could copy that out of here and save it elsewhere (like an email or something). In the LOAD interface you can insert copies of this text and overwrite your locally stored data.</p>
            <h4>Targets</h4>
            <button onClick={() => selectText('backupTargets')}>Select Targets</button>
            <textarea id={'backupTargets'} name={'backupTargets'} style={{ userSelect: 'all' }}>{targetCache}</textarea><br />
            <h4>Weapon Profiles</h4>
            <button onClick={() => selectText('backupWeaponProfiles')}>Select Weapon Profiles</button>
            <textarea id={'backupWeaponProfiles'} name={'backupWeaponProfiles'} style={{ userSelect: 'all' }}>{weaponCache}</textarea><br />
            <h4>Attacker Profiles</h4>
            <button onClick={() => selectText('backupAttackerProfiles')}>Select Attackers</button>
            <textarea id={'backupAttackerProfiles'} name={'backupAttackerProfiles'} style={{ userSelect: 'all' }}>{attackerCache}</textarea><br />
            <p>The text above is JSON formatted, and so needs to be formatted as is; don't repalce double quotes with singles, and you will need every curly bracket. Be wary of text editors that do any autoformating. https://pastebin.com/ is a decent place to put it.</p>
            <h3>Clear Custom Data</h3>
            <p>If your data gets munged or you need to switch out datasets, you can clear your local browsers cache of the data with this tool.</p>
            <button
                onClick={() => {
                    if (window.confirm('Are you sure you want to DELETE your TARGET data?')) {
                        localStorage.removeItem('userCreatedTargets');
                        window.location.reload();
                    } else {
                        // Do nothing!
                    }
                }}
            >Clear Target Data</button><br /><br /><br /><br />
            <button
                onClick={() => {
                    if (window.confirm('Are you sure you want to DELETE your ATTACKER data?')) {
                        localStorage.removeItem('userCreatedAttackers');
                        window.location.reload();
                    } else {
                        // Do nothing!
                    }
                }}
            >Clear Attacker Data</button><br /><br /><br /><br />
            <button
                onClick={() => {
                    if (window.confirm('Are you sure you want to DELETE your WEAPON PROFILE data?')) {
                        localStorage.removeItem('userCreatedWeaponProfiles');
                        window.location.reload();
                    } else {
                        // Do nothing!
                    }
                }}
            >Clear Weapon Profile Data</button><br /><br />
            <p>Please remember that if you clear out Weapon Profile Data but not attacker data, you're going to get some weird results AND POSSIBLE SYSTEM CRASHES. The worst case is this web page no longer loads. IF THAT HAPPENS, you use your webbrowser's settings to delete cached and locally stored data regarding this website (ie delete cookies and localstorage), and that should fix you up.</p>
        </div>

    );
};

export default SaveData;

