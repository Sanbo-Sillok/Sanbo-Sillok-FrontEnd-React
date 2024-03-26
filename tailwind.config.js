/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Pretendard: ['Pretendard Variable'],
      },
      colors: {
        'sanbo-blue': '#02A0EA',
        base: {
          100: '#F1F5F9',
          200: '#DDE1E6',
          300: '#C9CCD3',
          400: '#B5B8C1',
          500: '#A1A4AE',
          600: '#8D909B',
          700: '#272C33',
        },
      },
    },
    screens: {
      mobile: { max: '767px' },
      tablet: { max: '1024px' },
    },
  },
  plugins: [],
};
