import React from 'react';

import Dashboard from './Dashboard';
import bootstrap from './theme/bootstrap.module.css';

const App = () => {
    return (
        <div className={bootstrap['container']} style={{ width: '1650px', maxWidth: '100%' }}>
            <h1 style={{
                // transform: 'scale(2,1) perspective(200px) rotateX(40deg)',
                textShadow: '1px 1px 3px rgba(0,0,0,.3)',
                textAlign: 'left',
                fontFamily: 'impact, sans-serif',
                overflow: 'hidden'
            }}>KILLSCALE 40k</h1>
            <Dashboard />
        </div>
    );
};

export default App;