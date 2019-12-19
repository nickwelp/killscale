import { IRerollSet, ITarget, IWeaponProfile } from '../../../models/interfaces';
import { d6 } from '../../util';
import generateWounds from '../generateWounds';

const target1: ITarget = {
    name: 'target 1',
    FNP: 7,
    save: 7,
    invuln: 7,
    toHit: 0,
    toughness: 7,
    woundsPerModel: 7,
    modelCount: 1
};

const weapon_stubber: IWeaponProfile = {
    name: 'Stubber',
    AP: 0,
    damage: () => 5,
    strength: 4,
    type: 'Rapid (twice)',
    numberOfShots: () => 2,
    numberOfShotsLabel: '2 shots',
    tags: ['notBolter']
};

const dullReRollProfile: IRerollSet = {
    rerollHits: false,
    rerollHitRollsOfOne: false,
    crimsonFistsPlusToHit: false,
    explodingBolter6s: false,
    rerollWoundRollsOfOne: false,
    rerollWounds: false,
    IFHeavyWeaponsSuperDoctrine: false,
    applyHeavyWeaponMinusOneToHit: false,
};


jest.mock('../../util', () => ({
    d6: jest.fn(),
}));


describe('generateWounds function', () => {
    it('expect on 10 hits, rolling all 6s to wound, to get 10 wounds', () => {
        // @ts-ignore
        d6.mockImplementation(() => 6);
        expect((generateWounds(
            10,
            { ...target1, toughness: 4 },
            weapon_stubber,
            0,
            dullReRollProfile
        ))).toStrictEqual([10, 0]);
    });
    it('expect on 10 hits, rolling all 4s to wound, Str9 VS T4, 10 wounds', () => {
        // @ts-ignore
        d6.mockImplementation(() => 4);
        expect((generateWounds(
            10,
            { ...target1, toughness: 4 },
            { ...weapon_stubber, strength: 9 },
            0,
            dullReRollProfile
        ))).toStrictEqual([10, 0]);
    });
    it('expect on 10 hits, rolling all 1s to wound, Str9 VS T4, 0 wounds', () => {
        // @ts-ignore
        d6.mockImplementation(() => 1);
        expect((generateWounds(
            10,
            { ...target1, toughness: 4 },
            { ...weapon_stubber, strength: 9 },
            0,
            dullReRollProfile
        ))).toStrictEqual([0, 0]);
    });
    it('expect on 6 hits, rolling all 1..6 to wound, Str4 VS T4, 3 wounds', () => {
        let index = 1;
        // @ts-ignore
        d6.mockImplementation(() => index++);
        expect((generateWounds(
            6,
            { ...target1, toughness: 4 },
            { ...weapon_stubber, strength: 4 },
            0,
            dullReRollProfile
        ))).toStrictEqual([3, 0]);
    });
    it('expect on 6 hits, rolling all 1..6 to wound, Str4 VS T5, 2 wounds', () => {
        let index = 1;
        // @ts-ignore
        d6.mockImplementation(() => index++);
        expect((generateWounds(
            6,
            { ...target1, toughness: 5 },
            { ...weapon_stubber, strength: 4 },
            0,
            dullReRollProfile
        ))).toStrictEqual([2, 0]);
    });
    it('expect on 6 hits, rolling all 1..6 to wound, Str5 VS T4, 4 wounds', () => {
        let index = 1;
        // @ts-ignore
        d6.mockImplementation(() => index++);
        expect((generateWounds(
            6,
            { ...target1, toughness: 4 },
            { ...weapon_stubber, strength: 5 },
            0,
            dullReRollProfile
        ))).toStrictEqual([4, 0]);
    });
    it('expect on 6 hits, rolling all 1..6 to wound, mortal wounds on 6s, Str4 VS T4, 3 wounds, 1 mortal wound', () => {
        let index = 1;
        // @ts-ignore
        d6.mockImplementation(() => index++);
        expect((generateWounds(
            6,
            { ...target1, toughness: 4 },
            { ...weapon_stubber, strength: 4, tags: ['mortal wound on 6s to wound'] },
            0,
            dullReRollProfile
        ))).toStrictEqual([3, 1]);
    });
    it('expect on 6 hits, rolling all 1..6 to wound, +1 to wound, mortal wounds on 6+s, Str4 VS T4, 4 wounds, 2 mortal wound', () => {
        let index = 1;
        // @ts-ignore
        d6.mockImplementation(() => index++);
        expect((generateWounds(
            6,
            { ...target1, toughness: 4 },
            { ...weapon_stubber, strength: 4, tags: ['mortal wound on 6+s to wound'], plusToWound: 1 },
            0,
            { ...dullReRollProfile }
        ))).toStrictEqual([4, 2]);
    });
});
