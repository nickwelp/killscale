import { IUnit } from '../../interfaces';
import { d6 } from '../../../controllers/util';


export const RepulsorExecutioner: IUnit = {
    name: 'Repulsor Executioner',
    description: '',
    points: 336,
    tags: ['vehicle', 'hover', 'fly'],
    modelCountPerUnit: 1,
    weapons: [
        {
            name: 'Heavy Laser Destroyer',
            type: 'Heavy',
            numberOfShotsLabel: '2',
            tags: ['turrent', 'multiprofile'],
            uniqueIdentifier: 'turrent',
            numberOfShots: () => 2,
            AP: 4,
            toHit: 3,
            strength: 10,
            damage: () => {
                const roll = d6();
                if (roll < 3) return 3;
                return roll;
            }
        },
        {
            name: 'Heavy Laser Destroyer (fired twice)',
            type: 'Heavy',
            numberOfShotsLabel: '4',
            tags: ['turrent', 'multiprofile'],
            uniqueIdentifier: 'turrent',
            numberOfShots: () => 4,
            AP: 4,
            toHit: 3,
            strength: 10,
            damage: () => {
                const roll = d6();
                if (roll < 3) return 3;
                return roll;
            }
        },
        {
            name: 'Macro Plasma Incinerator (standard)',
            type: 'Heavy',
            numberOfShotsLabel: 'd6',
            tags: ['turrent', 'multiprofile'],
            uniqueIdentifier: 'turrent',
            numberOfShots: () => d6(),
            AP: 4,
            toHit: 3,
            strength: 8,
            damage: () => 1
        },
        {
            name: 'Macro Plasma Incinerator (overcharged)',
            type: 'Heavy',
            numberOfShotsLabel: 'd6',
            tags: ['turrent', 'multiprofile'],
            uniqueIdentifier: 'turrent',
            numberOfShots: () => d6(),
            AP: 4,
            toHit: 3,
            strength: 9,
            damage: () => 2
        },
        {
            name: 'Macro Plasma Incinerator (standard) (fired twice)',
            type: 'Heavy',
            numberOfShotsLabel: 'd6 x2',
            tags: ['turrent', 'multiprofile'],
            uniqueIdentifier: 'turrent',
            numberOfShots: () => d6() + d6(),
            AP: 4,
            toHit: 3,
            strength: 8,
            damage: () => 1
        },
        {
            name: 'Macro Plasma Incinerator (overcharged) (fired twice)',
            type: 'Heavy',
            numberOfShotsLabel: 'd6 x2',
            tags: ['turrent', 'multiprofile'],
            uniqueIdentifier: 'turrent',
            numberOfShots: () => d6() + d6(),
            AP: 4,
            toHit: 3,
            strength: 9,
            damage: () => 2
        },

        {
            name: 'Frag Storm Grenade Launcher x2',
            type: 'Assault',
            numberOfShotsLabel: 'd6 x2',
            tags: [],
            uniqueIdentifier: '',
            numberOfShots: () => d6() + d6(),
            AP: 0,
            toHit: 3,
            strength: 4,
            damage: () => 1,
        },
        {
            name: 'Heavy Onslaught Gattling Cannon',
            type: 'Heavy',
            numberOfShotsLabel: '12',
            tags: [],
            uniqueIdentifier: '',
            numberOfShots: () => 12,
            AP: 1,
            toHit: 3,
            strength: 5,
            damage: () => 1,
        },
        {
            name: 'Ironhail Heavy Stubber',
            type: 'Heavy',
            numberOfShotsLabel: '3',
            tags: [],
            uniqueIdentifier: '',
            numberOfShots: () => 3,
            AP: 1,
            toHit: 3,
            strength: 4,
            damage: () => 1,
        },
        {
            name: 'Twin Heavy Bolter',
            type: 'Heavy',
            numberOfShotsLabel: '6',
            tags: ['bolter'],
            uniqueIdentifier: '',
            numberOfShots: () => 6,
            AP: 1,
            toHit: 3,
            strength: 5,
            damage: () => 1,
        },
        {
            name: 'Stormbolters x2',
            type: 'Rapid Fire',
            numberOfShotsLabel: '4',
            tags: ['bolter', 'multiprofile'],
            uniqueIdentifier: 'rfmode',
            numberOfShots: () => 4,
            AP: 0,
            toHit: 3,
            strength: 4,
            damage: () => 1,
        },
        {
            name: 'Stormbolters x2 (rapid firing)',
            type: 'Rapid Fire',
            numberOfShotsLabel: '8',
            tags: ['bolter', 'multiprofile'],
            uniqueIdentifier: 'rfmode',
            numberOfShots: () => 8,
            AP: 0,
            toHit: 3,
            strength: 4,
            damage: () => 1,
        },
        {
            name: 'Twin Icarus Ironhail Heavy Stubber',
            type: 'Heavy',
            numberOfShotsLabel: '6',
            tags: ['antiflier'],
            uniqueIdentifier: '',
            numberOfShots: () => 6,
            AP: 1,
            toHit: 4,
            strength: 4,
            damage: () => 1,
        }
    ]
}
