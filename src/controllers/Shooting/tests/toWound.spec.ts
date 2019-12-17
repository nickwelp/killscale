import toWound from '../toWound';

describe('toWound Component', () => {
    it('should take equal values for toughness and strength and return a 4', () => {
        expect(toWound(1, 1)).toBe(4);
        expect(toWound(4, 4)).toBe(4);
        expect(toWound(6, 6)).toBe(4);
    });
    it('Strength is double Toughness or more returns a 2', () => {
        expect(toWound(1, 2)).toBe(2);
        expect(toWound(4, 8)).toBe(2);
        expect(toWound(6, 13)).toBe(2);
        expect(toWound(3, 7)).toBe(2);
    });
    it('should take Toughness 2 times strength or more and return a 6', () => {
        expect(toWound(2, 1)).toBe(6);
        expect(toWound(7, 3)).toBe(6);
        expect(toWound(12, 6)).toBe(6);
        expect(toWound(8, 4)).toBe(6);
    });
    it('should take Toughnnes greater than Str but less than twice and return a 5', () => {
        expect(toWound(3, 2)).toBe(5);
        expect(toWound(5, 3)).toBe(5);
        expect(toWound(11, 6)).toBe(5);
        expect(toWound(7, 4)).toBe(5);
    });
    it('should take Str greater than Toughness but less than twice and return a 3', () => {
        expect(toWound(2, 3)).toBe(3);
        expect(toWound(3, 5)).toBe(3);
        expect(toWound(6, 11)).toBe(3);
        expect(toWound(4, 7)).toBe(3);
    });
});