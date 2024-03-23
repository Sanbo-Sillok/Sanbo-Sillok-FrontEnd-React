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
          100: '#EBECED',
          200: '#3F4652',
          300: '#272C33',
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
