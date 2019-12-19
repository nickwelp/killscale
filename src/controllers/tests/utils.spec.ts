import { d3, d6 } from '../util';

describe('d6', () => {
    it('expect a healthy distribution of 1,2,3,4,5 and 6 when rolling d6 a sufficient number of times, and no other numbers', () => {
        const dieRolls: number[] = [];
        const numberOfRolls = 10000;
        const rangeTolerance = 0.02;
        // what's a healthy distribution?
        // I'm guessing w/n 2% of 1/6 for each number
        const lowDist = (1 / 6) - rangeTolerance;
        const highDist = (1 / 6) + rangeTolerance;
        for (let i = 0; i < numberOfRolls; i++) {
            dieRolls.push(d6());
        }
        const testRange = (count: number) => {
            const val = count / numberOfRolls;
            if (val < highDist && val > lowDist) {
                return true;
            }
            return false;
        };
        const ones = dieRolls.filter(e => e === 1).length;
        const twos = dieRolls.filter(e => e === 2).length;
        const threes = dieRolls.filter(e => e === 3).length;
        const fours = dieRolls.filter(e => e === 4).length;
        const fives = dieRolls.filter(e => e === 5).length;
        const sixes = dieRolls.filter(e => e === 6).length;
        const allFairRolls = dieRolls.filter(e => e >= 1 && e <= 6).length;
        expect(allFairRolls).toBe(numberOfRolls);
        expect(testRange(ones)).toBe(true);
        expect(testRange(twos)).toBe(true);
        expect(testRange(threes)).toBe(true);
        expect(testRange(fours)).toBe(true);
        expect(testRange(fives)).toBe(true);
        expect(testRange(sixes)).toBe(true);
        // console.log(ones, twos, threes, fours, fives, sixes, lowDist, highDist);
    });
    it('expect an uneven distribution of 1,2,3,4,5 and 6 when rolling d6 a small number of times, and no other numbers', () => {
        const dieRolls: number[] = [];
        const numberOfRolls = 12;
        const rangeTolerance = 0.02;
        // what's a healthy distribution?
        // I'm guessing w/n 2% of 1/6 for each number
        const lowDist = (1 / 6) - rangeTolerance;
        const highDist = (1 / 6) + rangeTolerance;
        for (let i = 0; i < numberOfRolls; i++) {
            dieRolls.push(d6());
        }
        const testRange = (count: number) => {
            const val = count / numberOfRolls;
            if (val < highDist && val > lowDist) {
                return true;
            }
            return false;
        };
        const ones = dieRolls.filter(e => e === 1).length;
        const twos = dieRolls.filter(e => e === 2).length;
        const threes = dieRolls.filter(e => e === 3).length;
        const fours = dieRolls.filter(e => e === 4).length;
        const fives = dieRolls.filter(e => e === 5).length;
        const sixes = dieRolls.filter(e => e === 6).length;
        const allFairRolls = dieRolls.filter(e => e >= 1 && e <= 6).length;
        expect(allFairRolls).toBe(numberOfRolls);
        const oneFailsRight = testRange(ones) && testRange(twos) && testRange(threes) && testRange(fours) && testRange(fives) && testRange(sixes);
        expect(oneFailsRight).toBe(false);
    });
});


describe('d3', () => {
    it('expect a healthy distribution of 1,2, & 3 when rolling d3 a sufficient number of times, and no other numbers', () => {
        const dieRolls: number[] = [];
        const numberOfRolls = 10000;
        const rangeTolerance = 0.02;
        // what's a healthy distribution?
        // I'm guessing w/n 2% of 1/6 for each number
        const lowDist = (1 / 3) - rangeTolerance;
        const highDist = (1 / 3) + rangeTolerance;
        for (let i = 0; i < numberOfRolls; i++) {
            dieRolls.push(d3());
        }
        const testRange = (count: number) => {
            const val = count / numberOfRolls;
            if (val < highDist && val > lowDist) {
                return true;
            }
            return false;
        };
        const ones = dieRolls.filter(e => e === 1).length;
        const twos = dieRolls.filter(e => e === 2).length;
        const threes = dieRolls.filter(e => e === 3).length;
        const allFairRolls = dieRolls.filter(e => e >= 1 && e <= 3).length;
        expect(allFairRolls).toBe(numberOfRolls);
        expect(testRange(ones)).toBe(true);
        expect(testRange(twos)).toBe(true);
        expect(testRange(threes)).toBe(true);
    });
});