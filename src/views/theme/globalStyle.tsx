import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body{
    background-color: #FFFFFF;
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
  label.tabbedCheck input ~ span {
    font-weight: regular;
  }
  label.tabbedCheck input:checked ~ span {
    font-weight: bold;
  }
  label.tabbedCheck input {
    visibility: hidden;
  }

  label.optionsTabs input ~ span {
    font-weight: regular;
    background: #FFF;
    padding: 10px;
  }
  label.optionsTabs input:checked ~ span {
    font-weight: bold;
    background: #F2F2F2;
  }
  label.optionsTabs input {
    visibility: hidden;
    width: 0;
    height: 0;
  }



`;

export default GlobalStyle;
