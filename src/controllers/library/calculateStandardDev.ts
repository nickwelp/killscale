import { ITarget, IUnit } from '../../models/interfaces';
import { sortNumber } from '../util';


const CalculateStandardDef = (
    set: number[],
    { name: shooterName, points }: IUnit,
    { name: targetName, inCover = false }: ITarget,
    iterations: number,
    modelCount: number,
    sumWounds: boolean): IStandDevReport => {
    let sumOfSet = 0;
    const modeKey = {};
    set.forEach((int) => {
        sumOfSet += int;
        // @ts-ignore
        if (modeKey[int.toString()]) {
            // @ts-ignore
            modeKey[int.toString()]++;
        }
        else {
            // @ts-ignore
            modeKey[int.toString()] = 1;
        }
    });
    let largestNumber = 0;

    Object.keys(modeKey).forEach((key) => {
        // @ts-ignore
        if (modeKey[key] > largestNumber) largestNumber = modeKey[key];
    });
    // @ts-ignore
    const largestModeKeys = Object.keys(modeKey).filter(key => modeKey[key] === largestNumber);

    set.sort(sortNumber);
    const setMean = sumOfSet / iterations;



    let sumOfDifference = 0;
    const lowerMedian: number[] = [];
    const upperMedian: number[] = [];

    set.forEach((int) => {
        if (int > setMean) upperMedian.push(int);
        else lowerMedian.push(int);
        const diffFromMean = int - setMean;
        sumOfDifference += (diffFromMean * diffFromMean);
    });

    const setStandardDeviation = Math.sqrt(sumOfDifference / iterations);
    const prunedLowerMedian = lowerMedian.filter((e) => e > (setMean - (2 * setStandardDeviation)));
    const prunedUpperMedian = upperMedian.filter((e) => e < (setMean + (2 * setStandardDeviation)));
    const prunedSet: number[] = [...prunedLowerMedian].concat(prunedUpperMedian).sort(sortNumber);


    return {
        name: shooterName,
        target: targetName,
        mean: (Math.round(setMean * 10) / 10),
        standardDeviation: (Math.round(setStandardDeviation * 10) / 10),
        mode: largestModeKeys,
        set: modeKey,
        modelCount: modelCount,
        ppm: (Math.round((points * modelCount / setMean) * 100) / 100),
        cynicalOutcome: Math.floor(setMean - setStandardDeviation),
        remove: false,
        targetPoints: points,
        inCover,
        sumWounds,
        raw: {
            median: set[Math.round(set.length / 2)],
            lowerMedian: (lowerMedian[Math.round(lowerMedian.length / 2)]),
            upperMedian: (upperMedian[Math.round(upperMedian.length / 2)]),
            best: set[set.length - 1],
            worst: set[0],
            length: set.length
        },
        pruned: {
            median: prunedSet[Math.round(prunedSet.length / 2)],
            lowerMedian: (prunedLowerMedian[Math.round(prunedLowerMedian.length / 2)]),
            upperMedian: (prunedUpperMedian[Math.round(prunedUpperMedian.length / 2)]),
            best: prunedSet[prunedSet.length - 1],
            worst: prunedSet[0],
            length: prunedSet.length
        }

    };
};

export default CalculateStandardDef;

interface IResults {
    median: number;
    lowerMedian: number;
    upperMedian: number;
    best: number;
    worst: number;
    length: number;
}

export interface IStandDevReport {
    name: string;
    target: string;
    mean: number;
    standardDeviation: number;
    cynicalOutcome?: number;
    set: any;
    mode: string[];
    modelCount: number;
    ppm: number;
    pruned: IResults;
    raw: IResults;
    remove?: boolean;
    sumWounds: boolean;
    inCover: boolean;
    targetPoints: number;
}