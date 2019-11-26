import { IWeaponProfile, ITarget, IRerollSet, IDoctrine, IUnit } from '../../models/interfaces';
import calculateStandardDef, { IStandDevReport } from '../library/calculateStandardDev';

import generateHits from './generateHits';
import generateWounds from './generateWounds';
import generateFailedSaves from './generateFailedSaves';
import applyFNPtoMortalWounds from './applyFNPtoMortalWounds';
import applyFailedSaves from './applyFailedSaves';

const iterations = 2000;
const cache = {};

interface IProps {
    shooter: IUnit;
    weapons: IWeaponProfile[];
    targets: ITarget[];
    sumWounds: boolean;
    modelCount: number;
    rerollProfile: IRerollSet;
    doctrine: IDoctrine;
}

export const processSet = ({
    shooter,
    weapons,
    targets,
    sumWounds,
    modelCount,
    rerollProfile,
    doctrine
}: IProps) => {
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

const processSetFunc = ({
    shooter,
    weapons,
    targets,
    sumWounds,
    modelCount,
    rerollProfile,
    doctrine }: IProps): IStandDevReport[] => {
    return targets.map(target => {
        const set: number[] = [];
        for (let y = 0; y < iterations; y++) {
            let sumOfDamage = 0;
            let woundCarryOver = 0;
            for (let k = 0; k < weapons.length; k++) {
                const [hits, autowounds]: [number, number] = generateHits(target, weapons[k], modelCount, rerollProfile, shooter);
                const [wounds, mortalWounds]: [number, number] = generateWounds(hits, target, weapons[k], autowounds, rerollProfile);
                const failedSaves: number = generateFailedSaves(wounds, target, weapons[k], doctrine);
                const [newDamage, rollOverWounds] = applyFailedSaves(failedSaves, woundCarryOver, target, weapons[k], sumWounds);
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
