/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        emerald: {
          deep: '#03291B',
          core: '#0C4830',
          mid: '#0F6244',
          bright: '#188460',
          light: '#3CA884',
          mist: '#DCEBE2',
        },
        rose: {
          gold: '#C08460',
          deep: '#9C6048',
          light: '#E3B694',
        },
        cream: {
          DEFAULT: '#FCF0E4',
          soft: '#F7F1EA',
          paper: '#FBF8F4',
        },
        ink: '#0A0A0A',
      },
      fontFamily: {
        sans: ["'Inter Variable'", 'Inter', 'system-ui', 'sans-serif'],
        display: ["'Cormorant Garamond'", 'Georgia', 'serif'],
      },
      letterSpacing: {
        widest: '0.18em',
        ultra: '0.32em',
      },
      transitionTimingFunction: {
        emerald: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
