module.exports = {
  purge: ['./src/**/*.{html,js}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#FF0000', // Custom red color for SoulCraft
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}