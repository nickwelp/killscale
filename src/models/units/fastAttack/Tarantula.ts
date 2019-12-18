import { IUnit } from '../../interfaces';

export const Tarantula: IUnit = {
    name: 'Tarantula',
    description: 'Tarantula',
    points: 37,
    tags: ['vehicle'],
    modelCountPerUnit: 1,
    toHit: 4,
    balisticSkill: 3,
    weapons: [
        {
            name: 'Twin Heavy Bolters',
            type: 'Heavy',
            numberOfShots: () => 6,
            numberOfShotsLabel: '6',
            tags: [],
            AP: 1,
            strength: 5,
            damage: () => 1,
        }
    ]
};
