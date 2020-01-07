import { IDoctrine, ITarget, IWeaponProfile } from '../../models/interfaces';
import { d6 } from '../util';

const generateFailedSaves = (
    wounds: number,
    target: ITarget,
    weapon: IWeaponProfile,
    doctrine: IDoctrine,
    total6s: number,
    total6ups: number
): number => {
    let failedSaves = 0;
    for (let g = 0; g < wounds; g++) {
        const dieResult = d6();
        let { AP, APFunction = undefined } = weapon;
        if (APFunction) AP = APFunction();
        if (weapon.tags.includes('wound rolls 6+s resolved at AP-4') && total6ups > 0) {
            AP = 4;
            total6ups--;
        }
        if (weapon.tags.includes('wound rolls 6+s resolved at AP-3') && total6ups > 0) {
            AP = 3;
            total6ups--;
        }
        if (weapon.tags.includes('unmodified wound rolls of 6 cause joy') && total6s > 0) {
            total6s--;
        }
        if (doctrine.devastator && (weapon.type === 'Heavy' || weapon.type === 'Grenade')) AP++;
        if (doctrine.tactical && (weapon.type === 'Rapid Fire' || weapon.type === 'Assault')) AP++;
        if (doctrine.assault && (weapon.type === 'Melee' || weapon.type === 'Pistol')) AP++;
        if (target.inCover && !weapon.tags.includes('ignores cover')) AP--;
        const saveValue = (target.save + AP) > target.invuln ? target.invuln : (target.save + AP);
        if (dieResult < saveValue) failedSaves++;
    }
    return failedSaves;
};

export default generateFailedSaves;