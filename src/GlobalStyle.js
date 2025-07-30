import { createGlobalStyle } from "styled-components";

export const GlobalSyle = createGlobalStyle`
      :root {
    --bg-color: ${({ theme }) => theme.background};
    --text-color: ${({ theme }) => theme.text};
    --input-bg: ${({ theme }) => theme.inputBackground};
    --border-color: ${({ theme }) => theme.border};
    --btn-text: ${({ theme }) => theme.buttonText};
    --home-text: ${({ theme }) => theme.homeText};
  }
    body {
    background-color: var(--bg-color);
    color: var(--text-color);
  }
`;

// ${({ theme }) => theme.~~~} 
// ==> ${Theme("")};  
export const Theme = (key) => (props) => props.theme[key];
