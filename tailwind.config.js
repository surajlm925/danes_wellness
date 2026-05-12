/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,jsx}',
    './src/components/**/*.{js,jsx}',
    './src/sections/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        evergreen:  '#105232',
        forest:     '#112519',
        midgreen:   '#19653F',
        deepforest: '#0a1a0f',
        moss:       '#D8E0D1',
        cream:      '#F8F3DF',
        amber:      '#C4922A',
        charcoal:   '#2C2C2C',
      },
      fontFamily: {
        display: ['Copperplate', 'Cinzel', 'Trajan Pro', 'serif'],
        body:    ['Jost', 'Helvetica Neue', 'sans-serif'],
      },
      letterSpacing: {
        display: '0.12em',
        nav:     '0.18em',
        label:   '0.22em',
        wide:    '0.08em',
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
}
