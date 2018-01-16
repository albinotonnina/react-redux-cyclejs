import * as ActionTypes from '../ActionTypes'

const initialState = {}

export default function reposByUser(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.REQUESTED_USER_REPOS:
      return Object.assign({}, state, {
        [action.payload.user]: undefined
      })
    case ActionTypes.RECEIVED_USER_REPOS:
      return Object.assign({}, state, {
        [action.payload.user]: action.payload.repos
      })
    case ActionTypes.CLEARED_USER_REPOS:
      return initialState
    default:
      return state
  }
}
