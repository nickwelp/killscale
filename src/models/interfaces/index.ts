export interface IWeaponProfile {
    name: string;
    type: string;
    numberOfShots: () => number;
    numberOfShotsLabel: string;
    AP: number;
    strength: number;
    damage: () => number;
    toHit: number;
    rerollHits?: boolean;
    rerollHitRollsOfOne?: boolean;
    rerollWounds?: boolean;
    rerollWoundRollsOfOne?: boolean;
    plusToHit?: number;
    plusToWound?: number;
    tags: string[];
    uniqueIdentifier?: string;
}

export interface IUnit {
    name: string;
    description: string;
    points: number;
    modelCountPerUnit: number;
    woundsPerModel?: number;
    FNP?: number; // 7 is none
    invuln?: number; // 7 is none
    save?: number;
    weapons: IWeaponProfile[];
    tags: string[];
}

export interface ITarget {
    name: string;
    FNP: number; // 7 is none
    invuln: number; // 7 is none
    save: number;
    toughness: number;
    woundsPerModel: number;
    modelCount: number;
    toHit: number;
    points?: number;
    tags?: string[];
}

export interface IRerollSet {
    rerollHits: boolean;
    rerollHitRollsOfOne: boolean;
    rerollWounds: boolean;
    rerollWoundRollsOfOne: boolean;
    explodingBolter6s: boolean;
    crimsonFistsPlusToHit: boolean;
    IFHeavyWeaponsSuperDoctrine?: boolean;
    applyHeavyWeaponMinusOneToHit?: boolean;

}

export interface IDoctrine {
    devastator: boolean;
    tactical: boolean;
    assault: boolean;
}
