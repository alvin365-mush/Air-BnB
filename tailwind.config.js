module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
       zIndex: {
        '0': 0,

       '10': 10,

       '20': 20,

       '30': 30,

       '40': 40,

       '50': 50,

       '25': 25,

       '50': 50,

       '75': 75,

       '100': 100,
        'auto': 'auto',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
