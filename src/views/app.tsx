import React from 'react';

import { ShooterController } from '../controllers/shooterController';
import Dashboard from './dashboard';

const App = () => {
    return (
        <div>
            {ShooterController(Dashboard)}
        </div>
    );
};

export default App;