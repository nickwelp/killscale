import { IUnit } from '../../interfaces';
import { d6, d3 } from '../../../controllers/util';


export const Repulsor: IUnit = {
    name: 'Repulsor',
    description: '',
    points: 302,
    tags: ['vehicle', 'hover', 'fly'],
    modelCountPerUnit: 1,
    weapons: [
        {
            name: 'Heavy Onslaught Gatling Cannon',
            type: 'Heavy',
            numberOfShotsLabel: '12',
            tags: ['turrent', 'multiprofile'],
            uniqueIdentifier: 'turrent1',
            numberOfShots: () => 12,
            AP: 1,
            toHit: 3,
            strength: 5,
            damage: () => 1
        },
        {
            name: 'Onslaught Gatling Cannon',
            type: 'Heavy',
            numberOfShotsLabel: '6',
            tags: ['turrent', 'multiprofile'],
            uniqueIdentifier: 'turrent8',
            numberOfShots: () => 6,
            AP: 1,
            toHit: 3,
            strength: 5,
            damage: () => 1
        },
        {
            name: 'Icarus Ironhail Heavy Stubber',
            type: 'Heavy',
            numberOfShotsLabel: '3',
            tags: ['antiflier', 'multiprofile'],
            uniqueIdentifier: 'turrent2',
            numberOfShots: () => 3,
            AP: 1,
            toHit: 3,
            strength: 4,
            damage: () => 1
        },
        {
            name: 'Ironhail Heavy Stubber',
            type: 'Heavy',
            numberOfShotsLabel: '3',
            tags: ['', 'multiprofile'],
            uniqueIdentifier: 'turrent3',
            numberOfShots: () => 3,
            AP: 1,
            toHit: 3,
            strength: 4,
            damage: () => 1
        },
        {
            name: 'Krakstorm Grenade Launcher x2',
            type: 'Assault',
            numberOfShotsLabel: '1',
            tags: ['turrent4', 'multiprofile'],
            uniqueIdentifier: 'turrent',
            numberOfShots: () => 2,
            AP: 1,
            toHit: 3,
            strength: 6,
            damage: () => d3()
        },
        {
            name: 'Twin Heavy Bolter',
            type: 'Heavy',
            numberOfShotsLabel: '6',
            tags: ['bolter', 'multiprofile'],
            uniqueIdentifier: 'turrent5',
            numberOfShots: () => 6,
            AP: 1,
            toHit: 3,
            strength: 5,
            damage: () => 1
        },
        {
            name: 'Storm Bolter (rapid firing) x2',
            type: 'Rapid Fire',
            numberOfShotsLabel: '4 x2',
            tags: ['bolter', 'multiprofile'],
            uniqueIdentifier: 'turrent6',
            numberOfShots: () => 8,
            AP: 1,
            toHit: 3,
            strength: 4,
            damage: () => 1
        },
    ]
}
