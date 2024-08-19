const colors = {
  'dark-1': '#474747',
  'dark-2': '#333333',
  'dark-3': '#1F1F1F',
  'dark-4': '#0A0A0A',
  'light-1': '#FFFFFF',
  'light-2': '#F5F5F5',
  'light-3': '#EBEBEB',
  'light-4': '#E0E0E0',
  accent: '#4F4FFF', // #008F39
  'accent-light': '#7070FF',
  error: '#FF3333',
  'error-dark': '#A30000',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./packages/renderer/**/*.{ts,tsx,html}'],
  theme: {
    extend: {
      colors: colors,
    },
  },
  plugins: ['prettier-plugin-tailwindcss'],
};
