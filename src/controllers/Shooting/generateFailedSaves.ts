import { IDoctrine, ITarget, IWeaponProfile } from '../../models/interfaces';
import { d6 } from '../util';

const generateFailedSaves = (wounds: number, target: ITarget, weapon: IWeaponProfile, doctrine: IDoctrine) => {
    let failedSaves = 0;
    for (let g = 0; g < wounds; g++) {
        const dieResult = d6();
        let AP = weapon.AP;
        if (doctrine.devastator && (weapon.type === 'Heavy' || weapon.type === 'Grenade')) AP++;
        if (doctrine.tactical && (weapon.type === 'Rapid Fire' || weapon.type === 'Assault')) AP++;
        if (doctrine.assault && (weapon.type === 'Close Combat')) AP++;
        const saveValue = (target.save + AP) > target.invuln ? target.invuln : (target.save + AP);
        if (dieResult < saveValue) failedSaves++;
    }
    return failedSaves;
};

export default generateFailedSaves;