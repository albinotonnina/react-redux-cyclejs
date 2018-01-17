import {combineReducers} from 'redux'

import {userResults, searchInFlight} from './users/reducer'
import {repos} from './repos/reducer'

export const reducer = combineReducers({
  repos,
  userResults,
  searchInFlight
})
