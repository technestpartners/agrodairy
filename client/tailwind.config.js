/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        elysium: {
          dark: '#0b3f1d',
          green: '#13612e',
          lightgreen: '#287a37',
          lime: '#7dc242',
          yellow: '#ffc928',
          yellowhover: '#f5b800',
          orange: '#e07f0b',
          cream: '#f7f4ec',
          tint: '#f3f9ef',
          tintborder: '#cfe3d2',
        },
        agro: {
          50: '#f3f9ef',
          100: '#e4f2dc',
          200: '#cfe3d2',
          300: '#a3d991',
          400: '#7dc242',
          500: '#4c9a3a',
          600: '#287a37',
          700: '#13612e',
          800: '#0f4c24',
          900: '#0b3f1d',
          950: '#062310',
        },
        gold: {
          50: '#fffdf0',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#ffc928',
          500: '#f5b800',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        }
      },
      fontFamily: {
        sans: ['"Roboto"', '"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Merriweather"', 'Georgia', 'serif'],
        ui: ['"Quicksand"', '"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
