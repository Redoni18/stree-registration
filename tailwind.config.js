/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'red-primary': '#FC055E',
        'background-primary': '#FF003D',
        'background-disabled': "#DAD3D4"
      },
      boxShadow: {
        'primary': '0px 5px 10px 2px #FF96AF99',
        'disabled': '0px 3px 5px 3px #00000040'
      },
    },
  },
  plugins: [],
};