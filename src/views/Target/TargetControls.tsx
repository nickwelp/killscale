import React, { ChangeEvent } from 'react';

const TargetControl = ({ props }: any) => {
    const { name, FNP, invuln, save, toughness, woundsPerModel, toHit, modelCount, tags } = props;
    let { points } = props;
    return (
        <div style={{ padding: '10px', margin: '5px', maxWidth: '200px', borderLeft: '1px solid #AAA' }}>
            <h5>{name}</h5>
            <small>
                {'FNP: ' + FNP} <br />
                {'invuln: ' + invuln} <br />
                {'save: ' + save}  <br />
                {'toughness: ' + toughness} <br />
                {'woundsPerModel: ' + woundsPerModel} <br />
                {'modelCount: ' + modelCount} <br />
                {'toHit: ' + toHit} <br />
                {'points: ' + points}<br />
                <input type={'text'} name={'pointsAssigner'} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    points = parseInt(e.currentTarget.value);
                }} />
                <br />
                {tags ? 'tags: ' + tags.join(', ') : ''}
            </small>
        </div>
    );
};
export default TargetControl;