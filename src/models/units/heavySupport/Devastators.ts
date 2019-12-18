import { d3, d6 } from '../../../controllers/util';
import { IUnit } from '../../interfaces';


export const Devastators: IUnit = {
    name: 'Devastators (whole unit)',
    description: '',
    points: 150,
    tags: ['infantry'],
    toHit: 3,
    modelCountPerUnit: 5,
    balisticSkill: 3,
    weapons: [
        {
            name: '4 Lascannons',
            type: 'Heavy',
            numberOfShotsLabel: '4',
            tags: ['multiprofile'],
            uniqueIdentifier: 'heavyweapon',
            numberOfShots: () => 4,
            AP: 3,
            strength: 9,
            damage: () => d6(),
        },
        {
            name: '4 Missile Launchers (Krak)',
            type: 'Heavy',
            numberOfShotsLabel: '4',
            tags: ['multiprofile'],
            uniqueIdentifier: 'heavyweapon',
            numberOfShots: () => 4,
            AP: 2,
            strength: 8,
            damage: () => d6(),
        },
        {
            name: '4 Missile Launchers (Frag)',
            type: 'Heavy',
            numberOfShotsLabel: 'd6 (x4)',
            tags: ['multiprofile'],
            uniqueIdentifier: 'heavyweapon',
            numberOfShots: () => d6() + d6() + d6() + d6(),
            AP: 0,
            strength: 4,
            damage: () => 1,
        },
        {
            name: '4 Heavy Bolters',
            type: 'Heavy',
            numberOfShotsLabel: '3 (x4)',
            tags: ['bolter', 'multiprofile'],
            uniqueIdentifier: 'heavyweapon',
            numberOfShots: () => 12,
            AP: 1,
            strength: 5,
            damage: () => 1,
        },
        {
            name: '4 Grav Cannons (set to d3 wounds)',
            type: 'Heavy',
            numberOfShotsLabel: '4 (x4)',
            tags: ['multiprofile'],
            uniqueIdentifier: 'heavyweapon',
            numberOfShots: () => 16,
            AP: 3,
            strength: 5,
            damage: () => d3(),
        },
        {
            name: '4 Multi Meltas (assumed close)',
            type: 'Heavy',
            numberOfShotsLabel: '4',
            tags: ['multiprofile'],
            uniqueIdentifier: 'heavyweapon',
            numberOfShots: () => 4,
            AP: 4,
            strength: 8,
            damage: () => {
                const roll = d6();
                const roll2 = d6();
                if (roll > roll2) return roll;
                return roll2;
            },
        },
        {
            name: '4 Plasma Cannons (regular)',
            type: 'Heavy',
            numberOfShotsLabel: 'd3 (x4)',
            tags: ['multiprofile'],
            uniqueIdentifier: 'heavyweapon',
            numberOfShots: () => d3() + d3() + d3() + d3(),
            AP: 3,
            strength: 7,
            damage: () => 1,
        },
        {
            name: '4 Plasma Cannons (overcharged)',
            type: 'Heavy',
            numberOfShotsLabel: 'd3 (x4)',
            tags: ['multiprofile'],
            uniqueIdentifier: 'heavyweapon',
            numberOfShots: () => d3() + d3() + d3() + d3(),
            AP: 3,
            strength: 8,
            damage: () => 2,
        },
    ]
};
