import { ITarget } from '../../models/interfaces';
import { d6 } from '../util';

const applyFNPtoMortalWounds = (mortalWounds: number, target: ITarget) => {
    let mortalWoundSum = 0;
    for (let g = 0; g < mortalWounds; g++) {
        if (d6() < target.FNP) {
            mortalWoundSum++;
        }
    }
    return mortalWoundSum;
};
export default applyFNPtoMortalWounds;