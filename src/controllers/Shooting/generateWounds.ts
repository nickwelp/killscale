import { IWeaponProfile, ITarget, IRerollSet } from '../../models/interfaces';
import { d6 } from '../util';
import toWound from './toWound';

const generateWounds = (hits: number, target: ITarget, weapon: IWeaponProfile, wounds = 0, rerollProfile: IRerollSet): [number, number] => {
    let mortalWounds = 0;
    for (let g = 0; g < hits; g++) {
        let dieResult = d6();
        if (rerollProfile.rerollWoundRollsOfOne && dieResult === 1) dieResult = d6();
        let woundModifier = 0;
        if (weapon.plusToWound) woundModifier += weapon.plusToWound;
        if (dieResult >= (toWound(target.toughness, weapon.strength) - woundModifier) && dieResult !== 1) wounds++;
        if ((dieResult + woundModifier) >= 6 && weapon.tags.includes('mortal wound on 6+s to wound')) {
            mortalWounds++;
        }
    }
    return [wounds, mortalWounds];
};

export default generateWounds;