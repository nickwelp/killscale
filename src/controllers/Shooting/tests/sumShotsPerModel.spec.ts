import sumShotsPerModel from '../sumShotsPerModel';

describe('sumShotsPerModel function', () => {
    it('should take a function that tallies each models shots, and the number of models, and sums them', () => {
        expect(sumShotsPerModel(() => 2, 2)).toBe(4);
        expect(sumShotsPerModel(() => 3, 3)).toBe(9);
        expect(sumShotsPerModel(() => 4, 15)).toBe(60);
        expect(sumShotsPerModel(() => 4, 150)).toBe(600);
    });
});