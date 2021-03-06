import { d3 } from '../../../controllers/util';
import { IUnit } from '../../interfaces';


export const Elminators: IUnit = {
    name: 'Eliminators (whole unit)',
    description: '',
    points: 74,
    tags: ['infantry'],
    weaponSkill: 3,
    modelCountPerUnit: 3,
    balisticSkill: 3,
    weapons: [
        {
            name: 'Sniper Executioner Round',
            type: 'Heavy',
            numberOfShotsLabel: '1',
            tags: ['bolter', 'multiprofile'],
            uniqueIdentifier: 'sniper',
            numberOfShots: () => 1,
            AP: 1,
            plusToHit: 2,
            strength: 5,
            damage: () => 1,
        },
        {
            name: 'Sniper Hyperfrag Round',
            type: 'Heavy',
            numberOfShotsLabel: 'd3',
            tags: ['multiprofile', 'bolter'],
            uniqueIdentifier: 'sniper',
            numberOfShots: () => d3(),
            AP: 0,
            strength: 5,
            damage: () => 1,
        },
        {
            name: 'Sniper Mortis Round',
            type: 'Heavy',
            numberOfShotsLabel: '1',
            tags: ['multiprofile', 'bolter', 'mortal wound on 6+s to wound'],
            uniqueIdentifier: 'sniper',
            numberOfShots: () => 1,
            AP: 2,
            strength: 5,
            damage: () => d3(),
        },
        {
            name: 'Sniper Executioner Round +1 to hit +1 to wound',
            type: 'Heavy',
            numberOfShotsLabel: '1',
            tags: ['bolter', 'multiprofile'],
            uniqueIdentifier: 'sniper',
            numberOfShots: () => 1,
            AP: 1,
            plusToWound: 1,
            plusToHit: 3,
            strength: 5,
            damage: () => 1,
        },
        {
            name: 'Sniper Hyperfrag Round +1 to hit +1 to wound',
            type: 'Heavy',
            numberOfShotsLabel: 'd3',
            tags: ['multiprofile', 'bolter'],
            uniqueIdentifier: 'sniper',
            numberOfShots: () => d3(),
            AP: 0,
            plusToHit: 1,
            plusToWound: 1,
            strength: 5,
            damage: () => 1,
        },
        {
            name: 'Sniper Mortis Round +1 to hit +1 to wound',
            type: 'Heavy',
            numberOfShotsLabel: '1',
            tags: ['multiprofile', 'bolter', 'mortal wound on 6+s to wound'],
            uniqueIdentifier: 'sniper',
            numberOfShots: () => 1,
            AP: 2,
            strength: 5,
            plusToWound: 1,
            plusToHit: 1,
            damage: () => d3(),
        },
        {
            name: 'Las Fusils',
            type: 'Heavy',
            numberOfShotsLabel: '1',
            tags: ['multiprofile'],
            uniqueIdentifier: 'sniper',
            numberOfShots: () => 1,
            AP: 3,
            strength: 8,
            damage: () => 3,
        },
        {
            name: 'Las Fusils +1 to hit +1 to wound',
            type: 'Heavy',
            numberOfShotsLabel: '1',
            tags: ['multiprofile'],
            uniqueIdentifier: 'sniper',
            numberOfShots: () => 1,
            AP: 3,
            strength: 8,
            plusToHit: 1,
            plusToWound: 1,
            damage: () => 3,
        },
    ]
};
