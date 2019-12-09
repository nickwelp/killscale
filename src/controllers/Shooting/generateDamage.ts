import { IRerollSet, ITarget, IWeaponProfile } from '../../models/interfaces';
import { d6 } from '../util';

const generateDamage = (
    failedSaves: number,
    woundCarryOver: number,
    target: ITarget,
    weapon: IWeaponProfile,
    sumWounds: boolean,
    rerollProfile: IRerollSet): [number, number] => {
    // this counts either wounds or dead models based on sumWounds boolean
    let sumOfDamageUnits: number = 0;
    for (let g = 0; g < failedSaves; g++) {
        let dam = weapon.damage();
        if (target.tags && target.tags.includes('vehicle') && rerollProfile.IFHeavyWeaponsSuperDoctrine && weapon.type === 'Heavy') {
            dam += 1;
        }
        let damCount = 0;

        for (let r = 0; r < dam; r++) {
            if (sumWounds) {
                if (d6() < target.FNP) {
                    sumOfDamageUnits++;
                    woundCarryOver = 0;

                }
            } else {
                const fail = d6() < target.FNP;
                if (fail) {
                    damCount++;
                    // woundSum is for rolling over model wound counts across low damage weapons
                    if (damCount === target.woundsPerModel
                        || ++woundCarryOver === target.woundsPerModel) {
                        if (woundCarryOver === target.woundsPerModel || target.woundsPerModel === 1) woundCarryOver = 0;
                        sumOfDamageUnits++;
                        // this is a clearer form of break; stops the r-for loop
                        r += dam + 1;
                    }
                }
            }
        }
    }
    return [sumOfDamageUnits, woundCarryOver];
};

export default generateDamage;