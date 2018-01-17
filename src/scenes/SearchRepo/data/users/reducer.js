import {SEARCHED_USERS, RECEIVED_USERS, CLEARED_SEARCH_RESULTS} from './actions'
const initialState = []
export function searchInFlight(state = false, action) {
  switch (action.type) {
    case SEARCHED_USERS:
      return true
    case RECEIVED_USERS:
    case CLEARED_SEARCH_RESULTS:
      return false
    default:
      return state
  }
}

export function userResults(state = [], action) {
  switch (action.type) {
    case RECEIVED_USERS:
      return action.payload.users
    case CLEARED_SEARCH_RESULTS:
      return initialState
    default:
      return state
  }
}
