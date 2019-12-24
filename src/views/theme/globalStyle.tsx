import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body{
    background-color: #f2f2f2;
    margin: 0;
    font-family: sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }
  body label {
    font-size: 12px;
    padding: 3px;
    cursor: pointer;
  }
  body label input, body label select {
    margin-left: 5px;
  }
  button {
    padding: 5px;
    cursor: pointer;
    border-radius: 3px;
    margin: 5px;
  }
`;

export default GlobalStyle;
