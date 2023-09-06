/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './utils/**/*.js',
    './wp-templates/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      lg: { max: '1400px' },
      md: { max: '1080px' },
      sm: { max: '640px' },
    },
    extend: {
      colors: {
        gmt: {
          transparent: '#00000065',
          100: '#F8F8F8',
          200: '#EBEBEB',
          300: '#CCCCCC',
          400: '#888888',
          500: '#555555',
        },
        black: '#231F20',
        brown: '#462F26',
        navy: '#14435B',
        darkGrey: '#515255',
        gold: '#E1AF00',
        darkBeige: '#807359',
        beige: '#C2B59B',
        lightBlue: '#AED5E7',
        grey: '#F5F5F5',
      },
      fontFamily: {
        sans: [
          'interstate',
          '-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif;',
        ],
        compressed: [
          'interstate-compressed',
          '-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif;',
        ],
        condensed: [
          'interstate-condensed',
          '-apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Cantarell, Ubuntu, roboto, noto, arial, sans-serif;',
        ],
        serif: [
          'century-old-style-std',
          'Iowan Old Style, Apple Garamond, Baskerville, Times New Roman, Droid Serif, Times, Source Serif Pro, serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;',
        ],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
