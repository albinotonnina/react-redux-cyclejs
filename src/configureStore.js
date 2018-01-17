import {createStore, applyMiddleware, compose} from 'redux'
import rootReducer from './reducers'

import {routerMiddleware} from 'react-router-redux'

import {createCycleMiddleware} from 'redux-cycles'
import {run} from '@cycle/run'
import {makeHTTPDriver} from '@cycle/http'
import {timeDriver} from '@cycle/time'

import main from './cycle'

export default function configureStore(history) {
  // Build the middleware for intercepting and dispatching navigation actions
  const _routerMiddleware = routerMiddleware(history)
  const cycleMiddleware = createCycleMiddleware()
  const {makeActionDriver, makeStateDriver} = cycleMiddleware

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(cycleMiddleware), applyMiddleware(_routerMiddleware))
  )

  run(main, {
    ACTION: makeActionDriver(),
    STATE: makeStateDriver(),
    Time: timeDriver,
    HTTP: makeHTTPDriver()
  })

  if (module.hot) {

    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers/index')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
