/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Aura design system
        surface: '#fff8f6',
        'surface-container-low': '#fff1ed',
        'surface-container': '#fee9e3',
        'surface-container-high': '#f9e4de',
        'on-surface': '#241916',
        'on-surface-variant': '#57423b',
        outline: '#8a726a',
        'outline-variant': '#dec0b7',
        primary: '#6d3bd7',
        'on-primary': '#ffffff',
        'primary-container': '#a37eff',
        secondary: '#006876',
        tertiary: '#006c51',
        error: '#ba1a1a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    }
  },
  plugins: []
};
