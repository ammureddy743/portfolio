/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        orange: {
          500: '#ff6b00',
          600: '#ea580c',
          700: '#c2410c',
        },
        brand: {
          bg: '#0d0d0e',
          frame: '#141416',
          card: '#1c1c1f',
          cardHover: '#242429',
          border: '#27272c',
          orange: '#ff6b00',
          orangeHover: '#ff5500',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
