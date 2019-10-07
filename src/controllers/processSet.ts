import { d6 } from './util';
import { IWeaponProfile, ITarget, IRerollSet, IDoctrine, IUnit } from '../models/interfaces';
import calculateStandardDef from './library/calculateStandardDev';

const iterations = 2000;
const cache = {};

const toWound = (toughness: number, strength: number) => {
    if (toughness === strength) return 4;
    else if (toughness >= strength * 2) return 6;
    else if (toughness > strength) return 5;
    else if (toughness <= strength * 2) return 2;
    else if (toughness < strength) return 3;
    return 100;
}


interface IProps {
    shooter: IUnit;
    weapons: IWeaponProfile[];
    targets: ITarget[];
    sumWounds: boolean;
    modelCount: number;
    rerollProfile: IRerollSet;
    doctrine: IDoctrine;
}

export const processSet = ({ shooter, weapons, targets, sumWounds, modelCount, rerollProfile, doctrine }: IProps) => {
    const hash = JSON.stringify({ shooter, weapons, targets, sumWounds, modelCount, rerollProfile, doctrine });
    // @ts-ignore
    if (cache[hash]) {
        // @ts-ignore
        return cache[hash];
    }
    // @ts-ignore
    else cache[hash] = processSetFunc({ shooter, weapons, targets, sumWounds, modelCount, rerollProfile, doctrine });
    // @ts-ignore
    return cache[hash];
};

const processSetFunc = ({ shooter, weapons, targets, sumWounds, modelCount, rerollProfile, doctrine }: IProps) => {
    const sumShotsPerModel = (a: () => number): number => {
        let sum = 0;
        for (let i = 0; i < modelCount; i++) {
            sum += a();
        }
        return sum;
    };


    const generateHits = (target: ITarget, weapon: IWeaponProfile) => {
        let hits = 0;
        for (let g = 0; g < sumShotsPerModel(weapon.numberOfShots); g++) {
            let dieResult = d6();

            let hitModifers = target.toHit;
            // @ts-ignore
            if (weapons.plusToHit) hitModifers += weapon.plusToHit;
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
        }
        return [hits, 0];
    };

    const generateWounds = (hits: number, target: ITarget, weapon: IWeaponProfile) => {
        let mortalWounds = 0;
        let wounds = 0;
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

    const generateFailedSaves = (wounds: number, target: ITarget, weapon: IWeaponProfile) => {
        let failedSaves = 0;
        for (let g = 0; g < wounds; g++) {
            let dieResult = d6();
            let AP = weapon.AP;
            if (doctrine.devastator && (weapon.type === 'Heavy' || weapon.type === 'Grenade')) AP++;
            if (doctrine.tactical && (weapon.type === 'Rapid Fire' || weapon.type === 'Assault')) AP++;
            if (doctrine.assault && (weapon.type === 'Close Combat')) AP++;
            let saveValue = (target.save + AP) > target.invuln ? target.invuln : (target.save + AP);
            if (dieResult < saveValue) failedSaves++;
        }
        return failedSaves;
    };
    const applyFailedSaves = (failedSaves: number, woundCarryOver: number, target: ITarget, weapon: IWeaponProfile) => {
        // this counts either wounds or dead models based on sumWounds boolean
        let sumOfDamageUnits: number = 0;
        for (let g = 0; g < failedSaves; g++) {
            let dam = weapon.damage();
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

    const applyFNPtoMortalWounds = (mortalWounds: number, target: ITarget) => {
        let mortalWoundSum = 0;
        for (let g = 0; g < mortalWounds; g++) {
            if (d6() < target.FNP) {
                mortalWoundSum++;
            }
        }
        return mortalWoundSum;
    }

    return targets.map(target => {
        const set: number[] = [];
        for (let y = 0; y < iterations; y++) {
            let sumOfDamage = 0;
            let woundCarryOver = 0;
            // let mortalWounds = 0;
            for (let k = 0; k < weapons.length; k++) {
                const [hits, autowounds]: number[] = generateHits(target, weapons[k]);
                // regular wounds, mortal wounds
                // const wounds: [number,number] = [0,0];
                const [wounds, mortalWounds]: number[] = generateWounds(hits, target, weapons[k]);
                const failedSaves: number = generateFailedSaves(wounds, target, weapons[k]);
                const [newDamage, rollOverWounds] = applyFailedSaves(failedSaves, woundCarryOver, target, weapons[k]);
                sumOfDamage += newDamage;
                const mortalWoundsPastFNP = applyFNPtoMortalWounds(mortalWounds, target);
                if (sumWounds) {
                    sumOfDamage += mortalWoundsPastFNP;
                } else {
                    // if don't sum the wounds then tally dead models, slain by produced mortal wounds and left over damage
                    sumOfDamage += Math.round((mortalWoundsPastFNP + rollOverWounds) / target.woundsPerModel);
                }
            }
            set.push(sumOfDamage);
        }

        return calculateStandardDef(set, shooter, target, iterations);
    });
};

