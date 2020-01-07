import React from 'react';

import helpImage from './images/killScaleHelp.png';


const HelpText = () => (
    <div style={{ fontFamily: 'serif', margin: '5px 20px 5px 20px', fontSize: '14px', borderRadius: '5px', padding: '20px', background: '#ccccccc', boxShadow: '1px 1px 3px rgba(0,0,0,.5)' }}>
        <p>Welcome to <strong>KillScale</strong>! KillScale simulates game processes many thousand times to generate predictions of outcomes.</p>
        <p>I got started on it when I observed that that people treat something like D6 shots as 2.5 rather than the actual average of 3.5, because people learn to plan around dice betraying them. My reasoning was that 3 Damage was considered more valuable than D6 damage regarding Las-Fusils VS Lascannons, while they also considered D6 damage to be greater than 2 in a different context. Another person then chimed in that the anticipatable result was 1 standard deviation away from the average. So that got me thinking:</p>
        <blockquote style={{ margin: '20px', padding: '10px', background: '#EEE' }}>
            What is standard deviation, how I use it to make better decisions? Can I anticipate an <i>a posterori</i> market driven decision by anticipating that results will be 1 standard deviation worse than the actual mean?
        </blockquote>
        <p>In KillScale, you select your Offensive Units, the Weapon Profiles for your Offensive Unit, and the Target Units. You also select the number of models or number of units shooting (depends on the unit).</p>
        <p>Then that interaction is simulated between 2000 and 10000 times. It starts at 3000 but have found that accuracy is not diminished at 2000. The number of simulations can be adjusted under Options. We then find the standard deviation of the outcomes.</p>
        <div>
            <img src={helpImage} style={{ width: '500px', maxWidth: '95%', margin: 'auto' }} alt={''} />
        </div>
        <p><strong>WTF is this?</strong></p>
        <ol>
            <li>Select the number of Units or Models for the simulation. The Name of the Attacking Model is beside the number drop down. Some units like Devastators are best understood as whole units at a time, while others like Intercessors are better as Individual Models, so 3 Units of Devastators or 10 models of Intercessors. Whether this number counts Units or Models is up to you, with how you include the number of weapons below.</li>
            <li>Select the number of times the weapon named to the right is fired. So a Bolt Rifle firing once can be a 1, but to simulate Rapid Fire make this number a 2. Or to simulate 3 Lascannons from 1 Unit, choose 3.</li>
            <li>This check box toggled the Weapon Profile on or off, and deselected Weapon Profiles can be hidden by the Toggle "hide unchecked weapons"</li>
            <li>The name of the weapon profile and how many shots it has. I.e Heavy Bolter (3 shots)</li>
            <li>Name of the Unit being Attacked.</li>
            <li>The eponymous KillScale. The KillScale represents the results of the N number of simulations, winnowed down to exclude outcomes 2 Standard Deviations removed from the mean. With the remainder of the result set, which is 95% of all results, reading left to right:<br />
                <ul>
                    <li>Surface the worst score</li>
                    <li>the median of results below the mean</li>
                    <li>the median</li>
                    <li>the mean of results above the mean</li>
                    <li> and the best result.</li>
                </ul><br />
                That looks like a series of numbers such as:<br /> <small>1</small> - 2 - <strong>3</strong> - 4 - <small>5</small><br />
                <ul>
                    <li>
                        Between the 1st and 5th integer are 95% of outcomes
                    </li>
                    <li>
                        Between the 2nd and 4th integers are 50% or more of all results
                    </li>
                    <li>
                        and middle integer is the median outcome
                    </li>
                </ul>

            </li>
            <li>
                This is the KillScale, without the outliers removed. It includes outcomes that measure as extreme edge cases.
            </li>
            <li>
                The HUD<br />
                <ul>
                    <li>
                        Cynical Outcome is an integer that represets the outcome that is one standard deviation below the mean. This value represents most player's cynical hunches about how a must have roll will go. Going back to the economic notion of valuing 3 Damage as Greater Than D6 whose median is 3.5, but D6 is valued Greater Than 2; ergo the Value of a D6 is approximately 2.5 as the market of decision makers treats it as such. The Cynical Outcome attempts to peg a number to what the market of decision makers is likely to treat it as.
                    </li>
                    <li>
                        Points Per Mean is the point sum of the Attacking Units or Models divided by the Mean of the outcome.
                    </li>
                    <li>
                        Mean is the average of the outcomes, edge cases included.
                    </li>
                    <li>
                        Standard Deviation is the Standard Deviation of the set. It represents how much the results tend to cluster near the Mean. Larger Standard Deviations mean less clustering and more unpredictable results.
                    </li>
                    <li>
                        Mode represents the mode of the raw set of outcomes. Mode is the most common result in the set. If several outcomes tie in frequency, they are all represented.
                    </li>
                </ul>
            </li>
            <li>
                Everybody loves bar charts. This chart is a Histogram representing all the results of the raw set across the X axis, while the Y axis represents the percentage of the total set.
            </li>
        </ol>
    </div>
);

export default HelpText;