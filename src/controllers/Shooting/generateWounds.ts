import { IRerollSet, ITarget, IWeaponProfile } from '../../models/interfaces';
import { d6 } from '../util';
import toWound from './toWound';

const generateWounds = (
    hits: number,
    { toughness }: ITarget,
    { tags, plusToWound, strength }: IWeaponProfile,
    wounds = 0,
    { rerollWoundRollsOfOne }: IRerollSet
): [number, number] => {
    let mortalWounds = 0;
    for (let g = 0; g < hits; g++) {
        let dieResult = d6();
        if (rerollWoundRollsOfOne && dieResult === 1) dieResult = d6();
        let woundModifier = 0;
        if (plusToWound) woundModifier += plusToWound;
        if (dieResult >= (toWound(toughness, strength) - woundModifier) && dieResult !== 1) wounds++;
        if ((dieResult + woundModifier) >= 6 && tags.includes('mortal wound on 6+s to wound')) {
            mortalWounds++;
        }
    }
    return [wounds, mortalWounds];
};

export default generateWounds;