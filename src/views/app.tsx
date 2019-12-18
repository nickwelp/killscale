import React from 'react';

import Dashboard from './Dashboard';

const App = () => {
    return (
        <div style={{ padding: '10px' }}>
            <h1 style={{
                transform: 'scale(2,1) perspective(200px) rotateX(40deg)',
                textShadow: '1px 1px 3px rgba(0,0,0,.3)',
                textAlign: 'center',
                fontFamily: 'impact, sans-serif'
            }}>KILLSCALE 40k</h1>
            <Dashboard />
        </div>
    );
};

export default App;