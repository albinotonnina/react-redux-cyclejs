import React from 'react'
import {render} from 'react-dom'
import App from './App'
require('babel-polyfill')

render(<App foo="bar" />, document.getElementById('app'))
