import sumShotsPerModel from './sumShotsPerModel';
import { IWeaponProfile, ITarget, IRerollSet, IUnit } from '../../models/interfaces';
import { d6 } from '../util';

const generateHits = (target: ITarget, weapon: IWeaponProfile, modelCount: number, rerollProfile: IRerollSet, shooter: IUnit): [number, number] => {
    let hits = 0;
    let autowounds = 0;
    for (let g = 0; g < sumShotsPerModel(weapon.numberOfShots, modelCount); g++) {
        let dieResult = d6();
        let hitModifers = target.toHit;
        if (weapon.plusToHit) hitModifers += weapon.plusToHit;
        if (rerollProfile.crimsonFistsPlusToHit) {
            let mCount = shooter.modelCountPerUnit;
            if (shooter.tags.includes('vehicle')) mCount = 5;
            if (target.modelCount >= (mCount + 5)) {
                hitModifers += 1;
            }
        }
        if (rerollProfile.rerollHits && (dieResult === 1 || dieResult < (weapon.toHit - hitModifers))) {
            dieResult = d6();
        }
        if (!rerollProfile.rerollHits && rerollProfile.rerollHitRollsOfOne && dieResult === 1) dieResult = d6();
        if (dieResult !== 1 && (dieResult >= (weapon.toHit - hitModifers))) hits++;
        if (dieResult === 6 && rerollProfile.explodingBolter6s && weapon.tags.includes('bolter')) hits++;
        if (dieResult === 6 && weapon.tags.includes('autowounds on 6s to hit')) {
            hits--;
            autowounds++;
        }
    }
    return [hits, autowounds];
};

export default generateHits;