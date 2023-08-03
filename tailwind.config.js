/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        navy: '#172b4d',
        'dark-navy': '#303c52',
        'light-navy': '#44546f',
        green: '#4bce97',
        yellow: '#e2b203',
        orange: '#faa53d',
        red: '#f87462',
        purple: '#9f8fef',
        blue: '#579dff',
      },
    },
  },
  plugins: [],
};
