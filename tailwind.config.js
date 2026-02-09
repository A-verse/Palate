/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      colors: {
        sage: {
          50: '#f6f7f6',
          100: '#e8ebe9',
          200: '#d1d7d3',
          300: '#a8b5ad',
          400: '#7d8f84',
          500: '#5f7169',
          600: '#4a5a51',
          700: '#3d4a42',
          800: '#323d37',
          900: '#2b342f',
        },
        cream: {
          50: '#fdfdfb',
          100: '#faf9f5',
          200: '#f5f3eb',
          300: '#ebe8db',
          400: '#ddd8c7',
          500: '#c9c2ad',
        },
        charcoal: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#2d2d2d',
        },
      },
    },
  },
  plugins: [],
}