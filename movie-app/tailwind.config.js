/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darker: '#141A26',     
        dark: '#141A26',      
        dark2: '#BF9B7A',      
        accent: '#BF7950',      
        primary: '#A66249',     
        gold: '#D9A491',     
      }
    }
  }
}


