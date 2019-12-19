
import { ITarget } from '../models/interfaces';
import Leviathan from '../models/targets/basicMarines/leviathan';
import RepulsorExecutioner from '../models/targets/basicMarines/repulsorExecutioner';
import Rhino from '../models/targets/basicMarines/rhino';
import Tacticals from '../models/targets/basicMarines/tacticals';
import Cultists from '../models/targets/chaosMarines/Cultists';
import Intercessors from '../models/targets/hooson/intercessors';
import Guardsmen from '../models/targets/imperialGuard/Guardsmen';
import IronHandsRepulsorExecutioner from '../models/targets/ironHands/ihRepulsorExecutioner';
import genericKnight from '../models/targets/knights/genericKnight';
import genricKnightRotate from '../models/targets/knights/genericKnightRotate';
import Boyz from '../models/targets/orks/Boyz';
import DeathshroudTerminators from '../models/targets/vessel/DeathshroudTerminators';
import PlagueBearers from '../models/targets/vessel/plagueBearers';

export const targets = (targetFaction: string[]): ITarget[] => {
    const selectedTargets: ITarget[] = [];
    if (targetFaction.includes('marines')) {
        selectedTargets.push(...[Intercessors, Tacticals, Rhino, Leviathan, IronHandsRepulsorExecutioner, RepulsorExecutioner]);
    }
    if (targetFaction.includes('csm')) {
        selectedTargets.push(...[DeathshroudTerminators, Cultists]);
    }
    if (targetFaction.includes('deamons')) {
        selectedTargets.push(...[PlagueBearers]);
    }
    if (targetFaction.includes('ig')) {
        selectedTargets.push(...[Guardsmen]);
    }
    if (targetFaction.includes('orks')) {
        selectedTargets.push(...[Boyz]);
    }
    if (targetFaction.includes('knight')) {
        selectedTargets.push(...[genricKnightRotate, genericKnight]);
    }
    return selectedTargets;
};
