/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '97.25': '24.313rem',
        '112': '28rem',
        '128': '32rem',
        '131': '32.75rem',
      },
      colors: {
        'yellow-orange': '#FD9A08',
        'default-gray': '#949393',
        'dark-yellow-orange': '#B16B05',
        'light-yellow-orange': '#FFE6C2',
        'modal-gray': '#9D9D9D'
      },
      boxShadow: {
        'equal': '0 0px 15px rgba(253, 154, 8, 1)',
      },
      scale: {
        '102': '1.02',
      },
      fontFamily: {
        official: ['Official Book', 'sans-serif'],
        'segoe': ['Segoe UI', 'sans-serif'],
      },
      screens: {
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }
  
        'laptop': '1600px',
        // => @media (min-width: 1024px) { ... }
  
        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      },
      fontFamily: {
        'segoe': ['Segoe UI', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [
  ],
}