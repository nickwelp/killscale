import { d3 } from '../../../controllers/util';
import { IUnit } from '../../interfaces';


export const Obliterators: IUnit = {
    name: 'Obliterators',
    description: '',
    points: 95,
    tags: ['infantry', 'deamon'],
    modelCountPerUnit: 1,
    weaponSkill: 3,
    balisticSkill: 3,
    weapons: [
        {
            name: 'Fleshmetal Weapon',
            type: 'Assault',
            numberOfShotsLabel: '6',
            tags: ['multiprofile'],
            uniqueIdentifier: 'tfc',
            numberOfShots: () => 6,
            AP: 2,
            APFunction: () => d3(),
            strength: 8,
            strengthFunction: () => 6 + d3(),
            damage: () => d3()
        }
    ]
};
