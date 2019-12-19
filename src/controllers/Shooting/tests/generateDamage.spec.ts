import generateDamage from '../generateDamage';

import { IRerollSet, ITarget, IWeaponProfile } from '../../../models/interfaces';
import { d6 } from '../../util';


const target1: ITarget = {
    name: 'target 1',
    FNP: 7,
    save: 7,
    invuln: 7,
    toHit: 0,
    toughness: 7,
    woundsPerModel: 1,
    modelCount: 1
};

const weapon_stubber: IWeaponProfile = {
    name: 'Stubber',
    AP: 0,
    damage: () => 1,
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

describe('generateDamage function', () => {
    it('on 10 wounds that get through saves, rolling 1 on any FNP saves, 1d weapon, 10 total damage generated', () => {
        // @ts-ignore
        d6.mockImplementation(() => 1);
        expect(generateDamage(
            10,
            0,
            target1,
            weapon_stubber,
            true,
            dullReRollProfile
        )).toStrictEqual([10, 0]);
    });
    it('on 10 wounds that get through saves, rolling 1 on any FNP saves, 2d weapon, 20 total damage generated', () => {
        // @ts-ignore
        d6.mockImplementation(() => 1);
        expect(generateDamage(
            10,
            0,
            target1,
            { ...weapon_stubber, damage: () => 2 },
            true,
            dullReRollProfile
        )).toStrictEqual([20, 0]);
    });
    it('on 10 wounds that get through saves, rolling 1 & 6 alternating on 6+++s, 2d weapon, 10 total damage generated', () => {
        let index = 0;
        // @ts-ignore
        d6.mockImplementation(() => ((index++ % 2) === 0 ? 6 : 1));
        expect(generateDamage(
            10,
            0,
            { ...target1, FNP: 6 },
            { ...weapon_stubber, damage: () => 2 },
            true,
            dullReRollProfile
        )).toStrictEqual([10, 0]);
    });
    it('counting dead 2w models, on 10 wounds that get through saves, rolling 1s on 6+++s, 1d weapon, 5 total damage generated', () => {
        // @ts-ignore
        d6.mockImplementation(() => 1);
        expect(generateDamage(
            10,
            0,
            { ...target1, FNP: 6, woundsPerModel: 2 },
            { ...weapon_stubber, damage: () => 1 },
            false,
            dullReRollProfile
        )).toStrictEqual([5, 0]);
    });
    it('counting dead 2w models, on 11 wounds that get through saves, rolling 1s on 6+++s, 1d weapon, 5 total damage generated, 1 rollover wound', () => {
        // @ts-ignore
        d6.mockImplementation(() => 1);
        expect(generateDamage(
            11,
            0,
            { ...target1, FNP: 6, woundsPerModel: 2 },
            { ...weapon_stubber, damage: () => 1 },
            false,
            dullReRollProfile
        )).toStrictEqual([5, 1]);
    });
    it('counting dead 3w models, on 5 wounds that get through saves, rolling 1s on 6+++s, 2d weapon, 2 total damage generated, 1 rollover wound', () => {
        // @ts-ignore
        d6.mockImplementation(() => 1);
        expect(generateDamage(
            5,
            0,
            { ...target1, FNP: 6, woundsPerModel: 3 },
            { ...weapon_stubber, damage: () => 2 },
            false,
            dullReRollProfile
        )).toStrictEqual([2, 2]);
    });
    it('counting dead 20w models, on 5 wounds that get through saves, rolling 1s on 6+++s, 2d weapon, 0 total damage generated, 10 rollover wound', () => {
        // @ts-ignore
        d6.mockImplementation(() => 1);
        expect(generateDamage(
            5,
            0,
            { ...target1, FNP: 6, woundsPerModel: 20 },
            { ...weapon_stubber, damage: () => 2 },
            false,
            dullReRollProfile
        )).toStrictEqual([0, 10]);
    });
    it('counting dead 3w models, on 5 wounds that get through saves, rolling 1s on 6+++s, 7d weapon, 5 total damage generated, 0 rollover wound', () => {
        // @ts-ignore
        d6.mockImplementation(() => 1);
        expect(generateDamage(
            5,
            0,
            { ...target1, FNP: 6, woundsPerModel: 3 },
            { ...weapon_stubber, damage: () => 7 },
            false,
            dullReRollProfile
        )).toStrictEqual([5, 0]);
    });
    it('counting dead 1w models, on 6 wounds that get through saves, rolling 1s on 6+++s, 7d weapon, 6 total damage generated, 0 rollover wound', () => {
        // @ts-ignore
        d6.mockImplementation(() => 1);
        expect(generateDamage(
            6,
            0,
            { ...target1, FNP: 6, woundsPerModel: 1 },
            { ...weapon_stubber, damage: () => 7 },
            false,
            dullReRollProfile
        )).toStrictEqual([6, 0]);
    });
});