import applyFNPtoMortalWounds from '../applyFNPtoMortalWounds';

import { ITarget } from '../../../models/interfaces';
import { d6 } from '../../util';

const target1: ITarget = {
    name: 'target 1',
    FNP: 5,
    save: 7,
    invuln: 7,
    toHit: 0,
    toughness: 7,
    woundsPerModel: 7,
    modelCount: 1
};

jest.mock('../../util', () => ({
    d6: jest.fn(),
}));

describe('applyFNPtoMortalWounds function', () => {
    it('10 Mortal wounds, 5+++, roll all 6s, returns 0', () => {
        // @ts-ignore
        d6.mockImplementation(() => 6);
        expect(applyFNPtoMortalWounds(10, target1)).toBe(0);
    });
    it('6 Mortal wounds, 5+++, roll 1..6, returns 4', () => {
        let index = 0;
        // @ts-ignore
        d6.mockImplementation(() => ++index);
        expect(applyFNPtoMortalWounds(10, target1)).toBe(4);
    });
});