/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'sanbo-blue': '#02A0EA',
      },
    },
    screens: {
      mobile: { max: '767px' },
      tablet: { max: '1024px' },
    },
  },
  plugins: [],
};
