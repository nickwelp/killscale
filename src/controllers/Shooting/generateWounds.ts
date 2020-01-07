import { IRerollSet, ITarget, IWeaponProfile } from '../../models/interfaces';
import { d6 } from '../util';
import toWound from './toWound';

const generateWounds = (
    hits: number,
    { toughness }: ITarget,
    { tags, plusToWound, strength, strengthFunction = undefined }: IWeaponProfile,
    wounds = 0,
    { rerollWoundRollsOfOne }: IRerollSet
): [number, number, number, number] => {
    let mortalWounds = 0;
    let total6s = 0;
    let total6ups = 0;
    for (let g = 0; g < hits; g++) {
        if (strengthFunction) strength = strengthFunction();
        let dieResult = d6();
        if (rerollWoundRollsOfOne && dieResult === 1) dieResult = d6();
        let woundModifier = 0;
        if (plusToWound) woundModifier += plusToWound;
        if (dieResult >= (toWound(toughness, strength) - woundModifier) && dieResult !== 1) wounds++;
        if ((dieResult + woundModifier) >= 6) {
            if (tags.includes('mortal wound on 6+s to wound')) {
                mortalWounds++;
            }
            total6ups++;
        }
        if (dieResult === 6) {
            if (tags.includes('mortal wound on unmodified 6s to wound')) {
                mortalWounds++;
            }
            total6s++;
        }
    }
    return [wounds, mortalWounds, total6s, total6ups];
};

export default generateWounds;