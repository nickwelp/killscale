import { IRerollSet, ITarget, IWeaponProfile } from '../../models/interfaces';
import { d6 } from '../util';

const generateDamage = (
    failedSaves: number,
    woundCarryOver: number,
    { tags, FNP, woundsPerModel }: ITarget,
    { damage, type }: IWeaponProfile,
    sumWounds: boolean,
    { IFHeavyWeaponsSuperDoctrine }: IRerollSet): [number, number] => {
    // this counts either wounds or dead models based on sumWounds boolean
    let sumOfDamageUnits: number = 0;
    for (let g = 0; g < failedSaves; g++) {
        let dam = damage();
        if (tags && tags.includes('vehicle') && IFHeavyWeaponsSuperDoctrine && type === 'Heavy') {
            dam += 1;
        }
        let damCount = 0;

        for (let r = 0; r < dam; r++) {
            if (sumWounds) {
                if (d6() < FNP) {
                    sumOfDamageUnits++;
                    woundCarryOver = 0;
                }
            } else {
                const fail = d6() < FNP;
                if (fail) {
                    damCount++;
                    // woundSum is for rolling over model wound counts across low damage weapons
                    if (damCount === woundsPerModel
                        || ++woundCarryOver === woundsPerModel) {
                        if (woundCarryOver === woundsPerModel || woundsPerModel === 1) woundCarryOver = 0;
                        if (dam >= woundsPerModel) { woundCarryOver = 0; }
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