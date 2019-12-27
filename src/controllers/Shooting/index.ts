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
}
const CreateSet = ({
    shooter,
    weapons,
    targets,
    sumWounds,
    modelCount,
    rerollProfile,
    doctrine,
    iterations
}: IProps) => {
    const hash = JSON.stringify({ shooter, weapons, targets, sumWounds, modelCount, rerollProfile, doctrine, iterations });
    // @ts-ignore
    if (cache[hash]) {
        // @ts-ignore
        return cache[hash];
    }
    // @ts-ignore
    else cache[hash] = processSetFunc({ shooter, weapons, targets, sumWounds, modelCount, rerollProfile, doctrine, iterations });
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
    iterations }: IProps): IStandDevReport[] => {
    return targets.map(target => {
        const set: number[] = [];
        for (let y = 0; y < iterations; y++) {
            let sumOfDamage = 0;
            const woundCarryOver = 0;
            for (let k = 0; k < weapons.length; k++) {
                const [hits, autowounds]: [number, number] = generateHits(target, weapons[k], modelCount, rerollProfile, shooter);
                const [wounds, mortalWounds, total6s, total6ups] = generateWounds(hits, target, weapons[k], autowounds, rerollProfile);
                const failedSaves: number = generateFailedSaves(wounds, target, weapons[k], doctrine, total6s, total6ups);
                const [newDamage, rollOverWounds] = generateDamage(failedSaves, woundCarryOver, target, weapons[k], sumWounds, rerollProfile);
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

export default CreateSet;

