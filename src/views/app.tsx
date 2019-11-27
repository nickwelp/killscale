import React from 'react';

import { ShooterController } from '../controllers/shooterController';
import Dashboard from './Dashboard';

const App = () => {
    return (
        <div>
            <h1 style={{ transform: 'scale(2,1) perspective(200px) rotateX(40deg)', textShadow: '1px 1px 3px rgba(0,0,0,.3)', textAlign: 'center', fontFamily: 'impact, sans-serif' }}>KILL SCALE</h1>
            {ShooterController(Dashboard)}
        </div>
    );
};

export default App;