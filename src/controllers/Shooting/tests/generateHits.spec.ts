import { IRerollSet, ITarget, IUnit, IWeaponProfile } from '../../../models/interfaces';
import { d6 } from '../../util';
import generateHits from '../generateHits';

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

const weapon_bolter: IWeaponProfile = {
    name: 'Bolter',
    AP: 0,
    damage: () => 5,
    strength: 4,
    type: 'Rapid (twice)',
    numberOfShots: () => 2,
    numberOfShotsLabel: '2 shots',
    tags: ['bolter']
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

const shooter: IUnit = {
    name: 'Mariney',
    modelCountPerUnit: 1,
    description: 'like a marine',
    points: 12,
    weaponSkill: 3,
    balisticSkill: 3,
    tags: [],
    weapons: [],
};

jest.mock('../../util', () => ({
    d6: jest.fn(),
}));

describe('generateHits function', () => {
    it('expect a marine shooting Stubber twice rolling 6s to get 2 hits', () => {
        // @ts-ignore
        d6.mockImplementation(() => 6);
        expect((generateHits(
            target1,
            weapon_stubber,
            1,
            dullReRollProfile,
            shooter
        ))).toStrictEqual([2, 0]);
    });
    it('expect a marine shooting Stubber twice rolling 1s to get 0 hits', () => {
        // @ts-ignore
        d6.mockImplementation(() => 1);
        expect((generateHits(
            target1,
            weapon_stubber,
            1,
            dullReRollProfile,
            shooter
        ))).toStrictEqual([0, 0]);
    });
    it('expect a marine shooting Bolter, exploding 6s twice rolling 6s to get 4 hits', () => {
        // @ts-ignore
        d6.mockImplementation(() => 6);
        expect((generateHits(
            target1,
            weapon_bolter,
            1,
            { ...dullReRollProfile, explodingBolter6s: true },
            shooter
        ))).toStrictEqual([4, 0]);
    });
    it('expect a marine shooting Bolter, exploding 6s twice rolling 5s to get 2 hits', () => {
        // @ts-ignore
        d6.mockImplementation(() => 5);
        expect((generateHits(
            target1,
            weapon_bolter,
            1,
            { ...dullReRollProfile, explodingBolter6s: true },
            shooter
        ))).toStrictEqual([2, 0]);
    });
    it('expect a marine shooting Bolter, exploding 6s twice rolling 5s to get 2 hits', () => {
        // @ts-ignore
        d6.mockImplementation(() => 5);
        expect((generateHits(
            target1,
            weapon_bolter,
            1,
            { ...dullReRollProfile, explodingBolter6s: true },
            shooter
        ))).toStrictEqual([2, 0]);
    });
    it('expect a marine shooting Bolter, twice rolling 3s, -1 to hit, to get 0 hits', () => {
        // @ts-ignore
        d6.mockImplementation(() => 3);
        expect((generateHits(
            { ...target1, toHit: -1 },
            weapon_bolter,
            1,
            { ...dullReRollProfile },
            shooter
        ))).toStrictEqual([0, 0]);
    });
    it('expect a marine shooting Bolter, rolling 6 than 4 gets 3 hits', () => {
        let index = 0;
        // @ts-ignore
        d6.mockImplementation(() => (++index % 2 === 0 ? 6 : 4));
        expect((generateHits(
            { ...target1 },
            weapon_bolter,
            1,
            { ...dullReRollProfile, explodingBolter6s: true },
            shooter
        ))).toStrictEqual([3, 0]);
    });
    it('expect a Infiltrator shooting occulus Bolter, rolling 6s twice generates 2 autowounds', () => {
        // @ts-ignore
        d6.mockImplementation(() => 6);
        expect((generateHits(
            { ...target1 },
            { ...weapon_bolter, tags: ['bolter', 'multiprofile', 'bolt carbine', 'autowounds on 6s to hit'] },
            1,
            { ...dullReRollProfile },
            { ...shooter },
        ))).toStrictEqual([0, 2]);
    });
    it('expect a Crimson Fists Infiltrator shooting occulus Bolter, rolling 6s twice generates 2 autowounds and 2 hits', () => {
        // @ts-ignore
        d6.mockImplementation(() => 6);
        expect((generateHits(
            { ...target1 },
            { ...weapon_bolter, tags: ['bolter', 'multiprofile', 'bolt carbine', 'autowounds on 6s to hit'] },
            1,
            { ...dullReRollProfile, explodingBolter6s: true },
            { ...shooter },
        ))).toStrictEqual([2, 2]);
    });
    it('expect 2+ to hit to generate 5 hits when rolling 6 times, getting 1,2,3,4,5,6', () => {
        let index = 1;
        // @ts-ignore
        d6.mockImplementation(() => index++);
        expect((generateHits(
            { ...target1 },
            { ...weapon_bolter, numberOfShots: () => 6 },
            1,
            { ...dullReRollProfile },
            { ...shooter, balisticSkill: 2 },
        ))).toStrictEqual([5, 0]);
    });
});
