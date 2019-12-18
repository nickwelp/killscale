import { IUnit } from '../../interfaces';


export const VernerableDreadnaughts: IUnit = {
    name: 'Vernerable Dreadnaughts',
    description: 'with Twin Heavy Bolters and Twin Autocannons',
    points: 130,
    tags: ['vehicle'],
    modelCountPerUnit: 1,
    toHit: 3,
    balisticSkill: 3,
    weapons: [
        {
            name: 'Twin Heavy Bolters',
            type: 'Heavy',
            tags: ['bolter'],
            numberOfShots: () => 6,
            numberOfShotsLabel: '6',
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
