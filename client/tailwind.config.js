/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Logo color palette (sampled directly from logo.png: #00A79D Teal & #003732 Deep Pine)
        brand: {
          primary: '#00A79D',   // Logo Teal / Persian Green ("AGRO" & Leaves)
          'primary-dark': '#008C84',
          deep: '#003732',      // Logo Deep Pine Spruce ("DAIRY" & "EXPORT LLP")
          'deep-dark': '#002622',
          secondary: '#008C84', // Mid teal tone
          accent: '#E6F7F5',    // Light teal mint tint for pills & badges
          'accent-hover': '#D4F1EE',
          cream: '#F4F9F8',     // Soft modern off-white tint matching teal
          ivory: '#FFFFFF',     // Clean white
          text: '#0C2422',      // High-contrast deep pine dark text
          muted: '#4D6765',     // Secondary/muted text with logo tint
          gold: '#F5B800',      // Warm golden accent
          border: '#D4ECE9',    // Subtle soft teal border
        },
        // Legacy elysium tokens mapped to logo palette
        elysium: {
          dark: '#002622',
          green: '#003732',       // Logo Deep Pine
          lightgreen: '#008C84',  // Mid Teal
          lime: '#00A79D',        // Logo Teal
          yellow: '#F5B800',
          yellowhover: '#E0A800',
          orange: '#E07F0B',
          cream: '#F4F9F8',
          tint: '#E6F7F5',
          tintborder: '#D4ECE9',
        },
        // Agro color system remapped directly to logo teal (#00A79D) & deep pine (#003732)
        agro: {
          50: '#EBF7F6',
          100: '#CCECE9',
          200: '#99D9D5',
          300: '#66C5C0',
          400: '#00A79D',         // Logo Primary Teal
          500: '#008C84',         // Secondary Teal
          600: '#006B64',
          700: '#00544D',
          800: '#003732',         // Logo Deep Pine
          900: '#002622',         // Deep Pine Dark
          950: '#001A17',
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
        display: ['"Playfair Display"', '"Merriweather"', 'Georgia', 'serif'],
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
        },
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'count-up': 'countUp 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      boxShadow: {
        'glow-teal': '0 0 25px -5px rgba(0, 167, 157, 0.40)',
        'glow-deep': '0 0 30px -8px rgba(0, 55, 50, 0.35)',
        'glow-yellow': '0 0 25px -5px rgba(245, 184, 0, 0.45)',
        'glow-lime': '0 0 25px -5px rgba(0, 167, 157, 0.35)',
        'glow-green': '0 0 30px -8px rgba(0, 55, 50, 0.25)',
        'soft-xl': '0 20px 40px -15px rgba(0, 55, 50, 0.08)',
        'card-hover': '0 22px 35px -10px rgba(0, 55, 50, 0.15)',
        'card-premium': '0 4px 24px 0 rgba(0, 55, 50, 0.08)',
        'nav': '0 2px 24px 0 rgba(0, 55, 50, 0.06)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #001A17 0%, #003732 50%, #00A79D 100%)',
        'section-gradient': 'linear-gradient(180deg, #F4F9F8 0%, #FFFFFF 100%)',
        'green-pattern': 'radial-gradient(at 0% 0%, rgba(0, 167, 157, 0.3) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(245, 184, 0, 0.15) 0px, transparent 50%)',
      }
    },
  },
  plugins: [],
}
