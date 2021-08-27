const { fontFamily } = require('tailwindcss/defaultTheme')
module.exports = {
  purge: {
      content: [
          './src/pages/**/*.{js,ts,jsx,tsx}',
          './src/components/**/*.{js,ts,jsx,tsx}',
        ],
      options: {
          safelist: [
            /data-theme$/,
          ]
      }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Varela Round', ...fontFamily.sans],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('daisyui')
  ],
  daisyui: {
    styled: true,
    themes: false,
    rtl: false,
  },
}
