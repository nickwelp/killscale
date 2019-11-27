import React from 'react';


const HelpText = () => (
    <div style={{ fontFamily: 'serif', margin: '5px 20px 5px 20px', fontSize: '14px', borderRadius: '5px', padding: '20px', background: '#ccccccc', boxShadow: '1px 1px 3px rgba(0,0,0,.5)' }}>
        <p>Well-come to <strong>Kill Scale</strong>! Anticipating Success&trade;. Kill Scale simulates game processes many thousand times to generate predictions of outcomes.</p>
        <p>In Kill Scale, you select your offensive units, your target units, and the weapons load out for your Offensive Unit. You also select the number of models or number of units shooting (depends on the unit).</p>
        <p>We then simulate that shooting phase between 2000 and 10000 times. I started at 10,000 but have found my accuracy is not diminished at 2000. We then find the standard deviation  of the outcomes, and trim outcomes more than 2  standDevs removed from the mean.</p>
        <p>With the remainder of the result set, which is 95% of all results, we surface the worst score,
            the median of results below the mean, the median, the mean of results above the mean, and the best result.</p>
        <p>So that looks like a series of numbers such as:<br /> <small>1</small> - 2 - <strong>3</strong> - 4 - <small>5</small></p>
        <p>Between the 1-5 are 95% of outcomes. Between 2-4 and 50% or more of all results, and 3 is the median outcome.</p>
        <p>ppm is short for Points Per Mean, which is the points of the units shooting divided by the mean of the results. Points currently are set and dont' change reflecting loadouts.</p>
        <p>v is for Variance, the Standard Deviation of the set. Often times it is better to act with higher variant units first, so your less variant units with more predictable outcomes can correct or exploit whatever happens regarding the variant shooting.</p>
    </div>
);

export default HelpText;