import React from 'react';
import { d6 } from '../controllers/util';

const Diagnostics = () => {

    const testD6LargeNumber = () => {
        const dieRolls: number[] = [];
        const numberOfRolls = 10000;
        const rangeTolerance = 0.02;
        // what's a healthy distribution?
        // I'm guessing w/n 2% of 1/6 for each number
        const lowDist = (1 / 6) - rangeTolerance;
        const highDist = (1 / 6) + rangeTolerance;
        for (let i = 0; i < numberOfRolls; i++) {
            dieRolls.push(d6());
        }
        const testRange = (count: number) => {
            const val = count / numberOfRolls;
            if (val < highDist && val > lowDist) {
                return true;
            }
            return false;
        };
        const ones = dieRolls.filter(e => e === 1).length;
        const twos = dieRolls.filter(e => e === 2).length;
        const threes = dieRolls.filter(e => e === 3).length;
        const fours = dieRolls.filter(e => e === 4).length;
        const fives = dieRolls.filter(e => e === 5).length;
        const sixes = dieRolls.filter(e => e === 6).length;
        const allFairRolls = dieRolls.filter(e => e >= 1 && e <= 6).length;
        let string = '';
        if (allFairRolls === numberOfRolls) {
            string += 'All numbers generated were 1, 2, 3,4, 5 and 6.';
        } else {
            string += 'Somehow your random number generator creates numbers other than 1-6, which is a deep flaw. BAD :( :( :( ';
        }
        const oneFailsRight = testRange(ones) && testRange(twos) && testRange(threes) && testRange(fours) && testRange(fives) && testRange(sixes);
        if (oneFailsRight) {
            string += 'The distribution of 1,2,3,4,5 and 6 is within 1/6 of all the set with 2% room for error. This set is ' + numberOfRolls + ' long so this is valid representation of large group of dice rolls. :) :) :) :)';
        } else {
            string += 'The distribution of 1,2,3,4,5 and 6 is not within 1/6 of all the set with 2% room for error, this set it ' + numberOfRolls + ' long; this is problematic and your computer is suspect :( :( :( ';
        }
        window.alert(string);
    };

    const testD6SmallNumber = () => {
        const dieRolls: number[] = [];
        const numberOfRolls = 12;
        const rangeTolerance = 0.02;
        // what's a healthy distribution?
        // I'm guessing w/n 2% of 1/6 for each number
        const lowDist = (1 / 6) - rangeTolerance;
        const highDist = (1 / 6) + rangeTolerance;
        for (let i = 0; i < numberOfRolls; i++) {
            dieRolls.push(d6());
        }
        const testRange = (count: number) => {
            const val = count / numberOfRolls;
            if (val < highDist && val > lowDist) {
                return true;
            }
            return false;
        };
        const ones = dieRolls.filter(e => e === 1).length;
        const twos = dieRolls.filter(e => e === 2).length;
        const threes = dieRolls.filter(e => e === 3).length;
        const fours = dieRolls.filter(e => e === 4).length;
        const fives = dieRolls.filter(e => e === 5).length;
        const sixes = dieRolls.filter(e => e === 6).length;
        const allFairRolls = dieRolls.filter(e => e >= 1 && e <= 6).length;
        let string = '';
        if (allFairRolls) {
            string += 'All numbers generated were 1 and 6 or between. ';
        } else {
            string += 'This computer system generated numbers other than 1,2,3,4,5 and 6. :( :( wtf. Something is up. ';
        }
        const oneFailsRight = testRange(ones) && testRange(twos) && testRange(threes) && testRange(fours) && testRange(fives) && testRange(sixes);
        if (!oneFailsRight) {
            string += 'Your computer system created an uneven distrubition of 1-6 which is expected when rolling a low number (12) of dice. This is expected and good.  :) :) :D';
        } else {
            string += 'Your computer system created and unusually even distribution of 1-6 when rolling 12 times. If you get this result two or three times in a row, try a different web browser as the one you are using has a problematic RNG mechanism. :( :( :( Your passwords are probably compromised too. Was your computer given to you by the Communist Party of China? Ditch it.';
        }
        window.alert(string);

    };

    return (<div style={{ maxWidth: '90%', margin: '10px', boxShadow: '1px 1px 3px #888', padding: '10px' }}>
        <h3>Test the Randomness of Your System</h3>
        <p>A sufficiently random system will, due to the law of large numbers, create a nearly uniform distribution of 1 through 6, arbitrarely set to 2% tolerance here, when applied to a large number of Die Rolls. A large numebr is taken to be 10,000 here.</p>
        <button onClick={() => testD6LargeNumber()}>Test a LARGE number of Rolls</button>
        <p>A sufficently random system will, due to the law of large numbers, create an uneven distribution of 1 through 6, when applied to a small number of die rolls. A small number is taken to be 12 here.</p>
        <button onClick={() => testD6SmallNumber()}>Test a SMALL number of Rolls</button>
    </div>);

};
export default Diagnostics;