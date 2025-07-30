import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  #root {
    max-width: 1280px;
    min-width: 465px;
    margin: 0 auto;
    padding-top: 70px;
    text-align: center;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
   
  }

  body {
    margin: 0;
    padding: 0;
    min-width: 320px;
    min-height: 100vh;
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.87);
    background-color: #d61f3d;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }


    ul, ol {
      list-style: none;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    img {
      max-width: 100%;
      display: block;
    }

    button, input, textarea, select {
      background: none;
      border: none;
      outline: none;
      box-sizing: border-box;
    }

    h1, h2, h3 {
        margin: 0;
        padding: 0;
    }

`;

export default GlobalStyle;
