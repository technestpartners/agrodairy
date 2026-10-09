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
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        serif: ['"Merriweather"', 'Georgia', 'serif'],
        display: ['"Merriweather"', 'Georgia', 'serif'],
        ui: ['"Outfit"', '"Plus Jakarta Sans"', 'sans-serif'],
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      boxShadow: {
        'glow-lime': '0 0 25px -5px rgba(125, 194, 66, 0.35)',
        'glow-yellow': '0 0 25px -5px rgba(255, 201, 40, 0.45)',
        'soft-xl': '0 20px 40px -15px rgba(11, 63, 29, 0.08)',
        'card-hover': '0 22px 35px -10px rgba(15, 76, 36, 0.15)',
      }
    },
  },
  plugins: [],
}
