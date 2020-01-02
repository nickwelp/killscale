import { IDoctrine, IRerollSet, ITarget, IUnit, IWeaponProfile } from '../../models/interfaces';
import calculateStandardDef, { IStandDevReport } from '../library/calculateStandardDev';

import applyFNPtoMortalWounds from './applyFNPtoMortalWounds';
import generateDamage from './generateDamage';
import generateFailedSaves from './generateFailedSaves';
import generateHits from './generateHits';
import generateWounds from './generateWounds';

const cache = {};

interface IProps {
    shooter: IUnit;
    weapons: IWeaponProfile[];
    targets: ITarget[];
    sumWounds: boolean;
    modelCount: number;
    rerollProfile: IRerollSet;
    doctrine: IDoctrine;
    iterations: number;
    shotsFired: number[];
}
const CreateSet = ({
    shooter,
    weapons,
    targets,
    sumWounds,
    modelCount,
    rerollProfile,
    doctrine,
    iterations,
    shotsFired
}: IProps) => {
    const hash = JSON.stringify({ shooter, weapons, targets, sumWounds, modelCount, rerollProfile, doctrine, iterations, shotsFired });
    // @ts-ignore
    if (cache[hash]) {
        // @ts-ignore
        return cache[hash];
    }
    // @ts-ignore
    else cache[hash] = processSetFunc({ shooter, weapons, targets, sumWounds, modelCount, rerollProfile, doctrine, iterations, shotsFired });
    // @ts-ignore
    return cache[hash];
};

const processSetFunc = ({
    shooter,
    weapons,
    targets,
    sumWounds,
    modelCount,
    rerollProfile,
    doctrine,
    iterations,
    shotsFired }: IProps): IStandDevReport[] => {
    return targets.map(target => {
        const set: number[] = [];
        for (let y = 0; y < iterations; y++) {
            let sumOfDamage = 0;
            let woundCarryOver = 0;
            let mortalWoundSum = 0;

            for (let k = 0; k < weapons.length; k++) {
                // @ts-ignore
                for (let h = 0; h < shotsFired[k]; h++) {
                    const [hits, autowounds]: [number, number] = generateHits(target, weapons[k], modelCount, rerollProfile, shooter);
                    const [wounds, mortalWounds, total6s, total6ups] = generateWounds(hits, target, weapons[k], autowounds, rerollProfile);
                    const failedSaves: number = generateFailedSaves(wounds, target, weapons[k], doctrine, total6s, total6ups);
                    const [newDamage, rollOverWounds] = generateDamage(failedSaves, woundCarryOver, target, weapons[k], sumWounds, rerollProfile);
                    sumOfDamage += newDamage;
                    const mortalWoundsPastFNP = applyFNPtoMortalWounds(mortalWounds, target);
                    if (sumWounds) {
                        sumOfDamage += mortalWoundsPastFNP;
                    } else {
                        mortalWoundSum += mortalWoundsPastFNP;
                        woundCarryOver += rollOverWounds;
                        if (woundCarryOver >= target.woundsPerModel) {
                            woundCarryOver = 0;
                            sumOfDamage++;
                        }
                    }
                }
            }
            if (!sumWounds && mortalWoundSum > 0) {
                sumOfDamage += Math.floor((mortalWoundSum + woundCarryOver) / target.woundsPerModel);
            }
            set.push(sumOfDamage);
        }
        return calculateStandardDef(set, shooter, target, iterations);
    });
};

export default CreateSet;

