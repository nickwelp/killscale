import React from 'react';

import { attackers } from '../models/units';

interface IProps {
    activeAttackersList: number[];
    setActiveAttackersList: any;
}

const SelectAttackers = ({ activeAttackersList, setActiveAttackersList }: IProps) => {
    const options = attackers.map((shooter, i) => {
        return (
            <li key={i}>
                <label>
                    <input type={'checkbox'} name={'shooterSelection'} value={i} checked={activeAttackersList.includes(i)} onChange={setActiveAttackersList} />
                    {shooter.name}
                </label>
            </li>
        );
    });
    return (
        <ul style={{ listStyleType: 'none', fontSize: 'small', display: 'flex', flexFlow: 'column wrap', width: '90%', maxWidth: '1500px', borderRadius: '3px', boxShadow: '2px 2px 5px #999', margin: 'auto', columnCount: 2, columnGap: '20px', height: '130px', padding: '10px' }}>
            {options}
        </ul>
    );
};

export default SelectAttackers;
