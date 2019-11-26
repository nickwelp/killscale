import { IUnit, ITarget } from '../../models/interfaces';
import { sortNumber } from '../util';

const CalculateStandardDef = (
    set: number[],
    { name: shooterName }: IUnit,
    { name: targetName }: ITarget,
    iterations: number): IStandDevReport => {
    let sumOfSet = 0;
    set.forEach((int) => {
        sumOfSet += int;
    });
    set.sort(sortNumber);
    const setMean = sumOfSet / iterations;

    let sumOfDifference = 0;
    let lowerMedian: number[] = [];
    let upperMedian: number[] = [];

    set.forEach((int) => {
        if (int > setMean) upperMedian.push(int);
        else lowerMedian.push(int);
        let diffFromMean = int - setMean;
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
        pruned: {
            median: prunedSet[Math.round(set.length / 2)],
            lowerMedian: (prunedLowerMedian[Math.round(prunedLowerMedian.length / 2)]),
            upperMedian: (prunedUpperMedian[Math.round(prunedUpperMedian.length / 2)]),
            best: prunedSet[prunedSet.length - 1],
            worst: prunedSet[0],
            length: prunedSet.length
        }

    };
};

export default CalculateStandardDef;

interface IPrunedResults {
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
    pruned: IPrunedResults
}