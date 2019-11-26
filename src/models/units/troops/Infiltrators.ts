import { IUnit } from '../../interfaces';

export const Infiltrator: IUnit = {
    name: 'Infiltrators',
    description: 'Infiltrators Occulous Bolt Carbines',
    points: 21,
    tags: ['infantry'],
    modelCountPerUnit: 5,
    weapons: [
        {
            name: 'Occulous Bolt Carbine',
            type: 'Rapid Fire',
            numberOfShots: () => 1,
            numberOfShotsLabel: '1',
            tags: ['bolter', 'multiprofile', 'bolt carbine', 'autowounds on 6s to hit'],
            uniqueIdentifier: 'bolt carbine',
            AP: 0,
            toHit: 3,
            strength: 4,
            damage: () => 1,
        },
        {
            name: 'Occulous Bolt Carbine',
            type: 'Rapid Fire',
            numberOfShots: () => 2,
            numberOfShotsLabel: '2',
            tags: ['bolter', 'multiprofile', 'bolt carbine', 'autowounds on 6s to hit'],
            uniqueIdentifier: 'bolt carbine',
            AP: 0,
            toHit: 3,
            strength: 4,
            damage: () => 1,
        }
    ]
};
