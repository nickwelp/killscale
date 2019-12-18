import { IUnit } from '../../interfaces';


export const Dreadnaughts: IUnit = {
    name: 'Dreadnaughts',
    description: 'with Twin Heavy Bolters and Twin Autocannons',
    modelCountPerUnit: 1,
    tags: ['vehicle'],
    points: 130,
    toHit: 3,
    balisticSkill: 3,
    weapons: [
        {
            name: 'Twin Heavy Bolters',
            type: 'Heavy',
            tags: ['bolter'],
            numberOfShotsLabel: '6',
            numberOfShots: () => 6,
            AP: 1,
            strength: 5,
            damage: () => 1,
        },
        {
            name: 'Twin Autocannons',
            type: 'Heavy',
            tags: [],
            numberOfShotsLabel: '4',
            numberOfShots: () => 4,
            AP: 1,
            strength: 7,
            damage: () => 2,
        }
    ]
};
