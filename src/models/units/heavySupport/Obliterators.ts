import { d3 } from '../../../controllers/util';
import { IUnit } from '../../interfaces';


export const Obliterators: IUnit = {
    name: 'Obliterators',
    description: '',
    points: 105,
    tags: ['vehicle'],
    modelCountPerUnit: 1,
    weaponSkill: 4,
    balisticSkill: 2,
    weapons: [
        {
            name: 'Fleshmetal Weapon',
            type: 'Assault',
            numberOfShotsLabel: '4',
            tags: ['multiprofile'],
            uniqueIdentifier: 'tfc',
            numberOfShots: () => 4,
            AP: 2,
            APFunction: () => d3(),
            strength: 8,
            strengthFunction: () => 6 + d3(),
            damage: () => d3()
        }
    ]
};
