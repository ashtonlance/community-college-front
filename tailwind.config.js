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
      xl: { max: '1536px' },
      lg: { max: '1400px' },
      md: { max: '1080px' },
      mdsm: { max: '728px' },
      sm: { max: '640px' },
    },
    extend: {
      colors: {
        gmt: {
          transparent: '#231F20BF',
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
        rust: '#C05325',
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
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
  safelist: [
    'top-[207px]',
    'top-[150px]',
    'top-[192px]',
    'top-[200px], top-[140px]',
  ],
}
