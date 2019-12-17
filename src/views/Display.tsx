import React from 'react';

import { IRerollSet, ITarget, IUnit } from '../models/interfaces';
import ShootingProfile from './ShootingProfile';

const Display = ({ props }: any) => {
    const {
        targets,
        targetList,
        sumWounds,
        rerollHits,
        devastator,
        tactical,
        assault,
        explodingBolter6s,
        crimsonFistsPlusToHit,
        rerollHitRollsOfOne,
        rerollWounds,
        rerollWoundRollsOfOne,
        hideUncheckedWeapons,
        shooters,
        activeList,
        IFHeavyWeaponsSuperDoctrine,
        applyHeavyWeaponMinusOneToHit
    } = props;
    const selectedTargets: ITarget[] = targets.filter((_: ITarget, i: number) => targetList.includes(i));
    const uiSettings = {
        hideUncheckedWeapons
    };
    const rerollProfile: IRerollSet = {
        rerollHits,
        rerollHitRollsOfOne,
        rerollWounds,
        rerollWoundRollsOfOne,
        explodingBolter6s,
        crimsonFistsPlusToHit,
        IFHeavyWeaponsSuperDoctrine,
        applyHeavyWeaponMinusOneToHit
    };
    const doctrine = {
        devastator,
        tactical,
        assault
    };
    const profiles = shooters.map((shooter: IUnit, i: number) => {
        return ShootingProfile({
            shooter,
            targets: selectedTargets,
            sumWounds,
            rerollProfile,
            doctrine,
            uiSettings,
            hideProfile: !activeList.includes(i)
        });
    });
    return (
        <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
            {profiles}
        </div>
    );
};

export default Display;