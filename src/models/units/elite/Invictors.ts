import { IUnit } from '../../interfaces';
import { d6 } from '../../../controllers/util';


export const Invictors: IUnit = {
    name: 'Invictors',
    description: 'with Twin Ironhail Autocannons',
    points: 136,
    tags: ['vehicle'],
    modelCountPerUnit: 1,
    weapons: [
        {
            name: 'Twin Ironhail Autocannons',
            type: 'Heavy',
            tags: [],
            numberOfShotsLabel: '6',
            numberOfShots: () => 6,
            AP: 1,
            toHit: 3,
            strength: 7,
            damage: () => 2,
        },
        {
            name: 'Heavy Bolters',
            type: 'Heavy',
            tags: ['bolter'],
            numberOfShotsLabel: '3',
            numberOfShots: () => 3,
            AP: 1,
            toHit: 3,
            strength: 5,
            damage: () => 1,
        },
        {
            name: 'Heavy Stubber',
            type: 'Heavy',
            tags: [],
            numberOfShotsLabel: '3',
            numberOfShots: () => 3,
            AP: 1,
            toHit: 3,
            strength: 4,
            damage: () => 1,
        },
        {
            name: 'Fragstorm Grenade Launcher',
            type: 'Assault',
            tags: [],
            numberOfShotsLabel: 'd6',
            numberOfShots: () => d6(),
            AP: 0,
            toHit: 3,
            strength: 4,
            damage: () => 1,
        }
    ]
}