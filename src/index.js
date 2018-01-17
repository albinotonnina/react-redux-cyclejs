import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import {ConnectedRouter} from 'react-router-redux'

import 'semantic-ui-css/semantic.min.css'
import configureStore from './state/configureStore'
import App from './App'

const history = createHistory()
const store = configureStore(history)

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ConnectedRouter>
      </Provider>
    )
  }
}

ReactDOM.render(<Root />, document.querySelector('#app'))

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept()
}
