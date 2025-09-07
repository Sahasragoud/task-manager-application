/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
      '0%': { opacity: 0 },
      '100%': { opacity: 1 },
      },
  },
  animation: {
    float: 'float 6s ease-in-out infinite',
    slideUp: 'slideUp 0.6s ease-out forwards',
    fadeIn: 'fadeIn 0.6s ease-in-out forwards',

  },
    },
  },
  plugins: [],
}
