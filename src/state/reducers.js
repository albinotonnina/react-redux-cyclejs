import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'
import {reducer as searchRepo} from '../scenes/SearchRepo/reducer'

export default combineReducers({
  searchRepo,
  routing: routerReducer
})
