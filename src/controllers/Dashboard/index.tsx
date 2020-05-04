import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../views/theme';
import GlobalStyle from '../../views/theme/globalStyle';

import Application from '../../views/App';

const Dashboard: React.FC = () => {
    return (
        <div className="App">
            <GlobalStyle />
            <ThemeProvider theme={theme}>
                <Application />
            </ThemeProvider>
        </div>
    );
};

export default Dashboard;