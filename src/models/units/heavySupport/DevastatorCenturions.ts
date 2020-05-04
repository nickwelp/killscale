import { d6 } from '../../../controllers/util';
import { IUnit } from '../../interfaces';


export const DevestatorCenturion: IUnit = {
    name: 'Devestator Centurion',
    description: '',
    points: 70,
    tags: ['infantry'],
    modelCountPerUnit: 1,
    weaponSkill: 2,
    balisticSkill: 2,
    weapons: [
        {
            name: 'Two Heavy Bolters',
            type: 'Heavy',
            numberOfShotsLabel: '6',
            tags: ['bolter', 'multiprofile', 'ignores cover'],
            uniqueIdentifier: 'loadout',
            numberOfShots: () => 6,
            AP: 1,
            strength: 5,
            damage: () => 1,
        },
        {
            name: 'Huricane Bolter',
            type: 'Rapid Fire',
            numberOfShotsLabel: '6',
            tags: ['bolter', 'ignores cover'],
            uniqueIdentifier: 'loadout2',
            numberOfShots: () => 6,
            AP: 0,
            strength: 4,
            damage: () => 1,
        },
        {
            name: 'Two LasCannons',
            type: 'Heavy',
            numberOfShotsLabel: '2',
            tags: ['multiprofile', 'ignores cover'],
            uniqueIdentifier: 'loadout',
            numberOfShots: () => 2,
            AP: 3,
            strength: 9,
            damage: () => d6(),
        }
    ]
};
