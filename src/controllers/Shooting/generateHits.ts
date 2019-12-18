import { IRerollSet, ITarget, IUnit, IWeaponProfile } from '../../models/interfaces';
import { d6 } from '../util';
import sumShotsPerModel from './sumShotsPerModel';

const generateHits = (
    target: ITarget,
    { type, numberOfShots, plusToHit, tags }: IWeaponProfile,
    modelCount: number,
    { crimsonFistsPlusToHit, applyHeavyWeaponMinusOneToHit, rerollHits, rerollHitRollsOfOne, explodingBolter6s }: IRerollSet,
    shooter: IUnit): [number, number] => {
    const toHit = type === "Melee" ? shooter.balisticSkill : shooter.toHit;
    let hits = 0;
    let autowounds = 0;
    for (let g = 0; g < sumShotsPerModel(numberOfShots, modelCount); g++) {
        let dieResult = d6();
        let hitModifers = target.toHit;
        if (plusToHit) hitModifers += plusToHit;
        if (crimsonFistsPlusToHit) {
            let mCount = shooter.modelCountPerUnit;
            if (shooter.tags.includes('vehicle')) mCount = 5;
            if (target.modelCount >= (mCount + 5)) {
                hitModifers += 1;
            }
        }
        if (applyHeavyWeaponMinusOneToHit) {

        }
        if (rerollHits && (dieResult === 1 || dieResult < (toHit - hitModifers))) {
            dieResult = d6();
        }
        if (!rerollHits && rerollHitRollsOfOne && dieResult === 1) dieResult = d6();
        if (dieResult !== 1 && (dieResult >= (toHit - hitModifers))) hits++;
        if (dieResult === 6 && explodingBolter6s && tags.includes('bolter')) hits++;
        if (dieResult === 6 && tags.includes('autowounds on 6s to hit')) {
            hits--;
            autowounds++;
        }
    }
    return [hits, autowounds];
};

export default generateHits;