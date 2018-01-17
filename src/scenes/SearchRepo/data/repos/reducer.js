import {REQUESTED_USER_REPOS, RECEIVED_USER_REPOS, CLEARED_USER_REPOS, REJECTED_USER_REPOS} from './actions'

const initialState = {}

export function repos(state = initialState, action) {
  switch (action.type) {
    case REQUESTED_USER_REPOS:
      return Object.assign({}, state, undefined)
    case RECEIVED_USER_REPOS:
      return Object.assign({}, state, {
        data: action.payload.repos,
        error: false
      })
    case REJECTED_USER_REPOS:
      return Object.assign({}, state, {
        data: [],
        error: {message: action.payload.repos}
      })
    case CLEARED_USER_REPOS:
      return initialState
    default:
      return state
  }
}
