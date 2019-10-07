import { IUnit } from '../../interfaces';

export const Suppressors: IUnit = {
    name: 'Suppressors',
    description: 'Suppressors',
    points: 30,
    tags: ['infantry'],
    modelCountPerUnit: 3,
    weapons: [
        {
            name: 'Autocannon',
            type: 'Heavy',
            numberOfShots: () => 2,
            numberOfShotsLabel: '2',
            tags: [],
            AP: 1,
            toHit: 3,
            strength: 7,
            damage: () => 2,
        }
    ]
}
