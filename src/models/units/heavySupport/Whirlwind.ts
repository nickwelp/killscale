import { d6, d3 } from '../../../controllers/util';
import { IUnit } from '../../interfaces';


export const Whirlwind: IUnit = {
    name: 'Whirlwind',
    description: '',
    points: 80,
    tags: ['vehicle'],
    modelCountPerUnit: 1,
    weapons: [
        {
            name: 'Vengeance Launcher',
            type: 'Heavy',
            numberOfShotsLabel: '2d3',
            tags: ['turrent', 'multiprofile'],
            uniqueIdentifier: 'turrent',
            numberOfShots: () => d3() + d3(),
            AP: 1,
            toHit: 3,
            strength: 7,
            damage: () => 2
        },
        {
            name: 'Vengeance Launcher (fired twice)',
            type: 'Heavy',
            numberOfShotsLabel: '2d3 + 2d3',
            tags: ['turrent', 'multiprofile'],
            uniqueIdentifier: 'turrent',
            numberOfShots: () => d3() + d3() + d3() + d3(),
            AP: 1,
            toHit: 3,
            strength: 7,
            damage: () => 2
        },
        {
            name: 'Castellen Launcher',
            type: 'Heavy',
            numberOfShotsLabel: '2d6',
            tags: ['turrent', 'multiprofile'],
            uniqueIdentifier: 'turrent',
            numberOfShots: () => d6() + d6(),
            AP: 0,
            toHit: 3,
            strength: 6,
            damage: () => 1
        },
        {
            name: 'Castellen Launcher (fired twice)',
            type: 'Heavy',
            numberOfShotsLabel: '2d6 + 2d6',
            tags: ['turrent', 'multiprofile'],
            uniqueIdentifier: 'turrent',
            numberOfShots: () => d6() + d6() + d6() + d6(),
            AP: 0,
            toHit: 3,
            strength: 6,
            damage: () => 1
        },
    ]
};
