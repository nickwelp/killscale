import { IDoctrine, ITarget, IWeaponProfile } from '../../../models/interfaces';
import generateFailedSaves from '../generateFailedSaves';
import { d6 } from '../../util';

const target1: ITarget = {
    name: 'target 1',
    FNP: 7,
    save: 3,
    invuln: 7,
    toHit: 0,
    toughness: 7,
    woundsPerModel: 7,
    modelCount: 1
};

const doctrine: IDoctrine = {
    devastator: false,
    tactical: false,
    assault: false,
};

const weapon_bolter: IWeaponProfile = {
    name: 'Bolter',
    AP: 0,
    damage: () => 5,
    strength: 4,
    type: 'Rapid Fire',
    numberOfShots: () => 2,
    numberOfShotsLabel: '2 shots',
    toHit: 3,
    tags: ['bolter']
};


jest.mock('../../util', () => ({
    d6: jest.fn(),
}));


describe('generateFailedSaves function', () => {
    it('on 10 hits, rolling all 6s to save VS AP0 and 3+ and no modidiers, rolling all 6s returns 0 failed saves', () => {
        // @ts-ignore
        d6.mockImplementation(() => 6);
        expect(generateFailedSaves(
            10,
            target1,
            weapon_bolter,
            doctrine
        )).toBe(0);
    });
    it('on 10 hits, rolling all 1s to save VS AP0 and 3+ and no modidiers, returns 10 failed saves', () => {
        // @ts-ignore
        d6.mockImplementation(() => 1);
        expect(generateFailedSaves(
            10,
            target1,
            weapon_bolter,
            doctrine
        )).toBe(10);
    });
    it('on 10 hits, rolling all 3s to save VS AP0 and 3+, returns 0 failed saves', () => {
        // @ts-ignore
        d6.mockImplementation(() => 3);
        expect(generateFailedSaves(
            10,
            target1,
            weapon_bolter,
            { ...doctrine, tactical: false }
        )).toBe(0);
    });
    it('on 10 hits, rolling all 3s to save VS AP0 and 3+, Tactical Doctrine, returns 10 failed saves', () => {
        // @ts-ignore
        d6.mockImplementation(() => 3);
        expect(generateFailedSaves(
            10,
            target1,
            weapon_bolter,
            { ...doctrine, tactical: true }
        )).toBe(10);
    });
});
