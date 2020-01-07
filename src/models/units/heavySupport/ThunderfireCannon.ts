import { d3 } from '../../../controllers/util';
import { IUnit } from '../../interfaces';


export const ThunderfireCannon: IUnit = {
    name: 'Thunderfire Cannon',
    description: '',
    points: 45,
    tags: ['vehicle'],
    modelCountPerUnit: 1,
    weaponSkill: 4,
    balisticSkill: 2,
    weapons: [
        {
            name: 'Thunderfire Cannon',
            type: 'Heavy',
            numberOfShotsLabel: '4d3',
            tags: ['multiprofile'],
            uniqueIdentifier: 'tfc',
            numberOfShots: () => d3() + d3() + d3() + d3(),
            AP: 1,
            strength: 5,
            damage: () => 1
        }
    ]
};
