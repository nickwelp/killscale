import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './views/theme';
import GlobalStyle from './views/theme/globalStyle';

import './App.css';

import Application from './views/app';

const App: React.FC = () => {
  return (
    <div className="App">
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Application />
      </ThemeProvider>
    </div>
  );
}

export default App;