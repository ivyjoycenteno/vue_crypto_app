const plugin = require('tailwindcss/plugin')
// const typography = require('@tailwindcss/typography')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        header: '1.875rem',
        label: '0.938rem',
        tSub: '1.313rem'
      }
    },
    fontFamily: {
      raleway: ['Raleway', 'sans-serif'],
      lato: ['Lato', 'sans-serif']
    },
    fontWeight: {
      thin: 100,
      normal: 400,
      medium: 500,
      semiBold: 600 
    }
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.rij-image-pos': {
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: '0',
          right: '0',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain'
        },
        '.logo-img': {
          backgroundImage: 'url("assets/rij-logo.png")',
          backgroundPosition: 'center',
          height: '5rem',
        },
        '.search-ico-pos': {
          position: 'relative',
          top: '.5rem',
          left: '0.7rem'
        },
        '.creds-ico-pos': {
          position: 'relative',
          top: '1.64rem',
          left: '.62rem'
        },
        '.rij-thumbnail': {
          background: '#FBFBFB',
          boxShadow: '0px 38.5185px 25.4815px rgba(249, 243, 213, 0.0364444), 0px 20px 13px rgba(249, 243, 213, 0.03), 0px 8.14815px 6.51852px rgba(249, 243, 213, 0.0235556), 0px 1.85185px 3.14815px rgba(249, 243, 213, 0.0144444)',
          borderRadius: '16px',
          // minWidth: '305px',
          // minHeight: '234px',
          width: '25%'
        },
        '.rij-tab-lbl.active': {
          color: '#2A316F',
          borderBottom: '1px solid',
          transition: 'border-color 0.5s ease',
        },
        '.rij-tab-lbl': {
          cursor: 'pointer',
          minWidth: '5rem'
        }
      })
    })
  ],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"]
}