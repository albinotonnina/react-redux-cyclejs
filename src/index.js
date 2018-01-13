import React from 'react'
import {render} from 'react-dom'
import WebFont from 'webfontloader'
import App from './App'
require('babel-polyfill')

const waitForWebfonts = function(fonts, callback) {
  WebFont.load({
    google: {
      families: fonts
    },
    active: callback
  })
}

const boot = Component => {
  render(<Component foo="bar" />, document.getElementById('app'))
}

window.onload = waitForWebfonts(['Montserrat:400,100,300,700,900'], () => boot(App))
