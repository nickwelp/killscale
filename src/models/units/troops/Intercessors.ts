import { IUnit } from '../../interfaces';

export const Intercessor: IUnit = {
    name: 'Intercessors',
    description: 'Intercessors with Stalker Bolt Rifles',
    points: 17,
    tags: ['infantry'],
    weaponSkill: 3,
    modelCountPerUnit: 5,
    balisticSkill: 3,
    weapons: [
        {
            name: 'Stalker Bolt Rifle',
            type: 'Heavy',
            numberOfShots: () => 1,
            numberOfShotsLabel: '1',
            tags: ['bolter', 'multiprofile', 'bolt rifle'],
            uniqueIdentifier: 'bolt rifle',
            AP: 2,
            strength: 4,
            damage: () => 2,
        },
        {
            name: 'Bolt Rifle',
            type: 'Rapid Fire',
            tags: ['bolter', 'multiprofile', 'bolt rifle'],
            uniqueIdentifier: 'bolt rifle',
            numberOfShots: () => 1,
            numberOfShotsLabel: '1',
            AP: 1,
            strength: 4,
            damage: () => 1,
        },
        {
            name: 'Auto Bolt Rifle',
            type: 'Assault',
            numberOfShots: () => 3,
            tags: ['bolter', 'multiprofile', 'bolt rifle'],
            uniqueIdentifier: 'bolt rifle',
            numberOfShotsLabel: '3',
            AP: 0,
            strength: 4,
            damage: () => 1,
        }
    ]
};
