import {
  REQUESTED_USER_REPOS,
  RECEIVED_USER_REPOS,
  CLEARED_USER_REPOS,
  REJECTED_USER_REPOS,
  REQUESTED_USER_REPOS_TOTAL,
  RECEIVED_USER_REPOS_TOTAL,
  REJECTED_USER_REPOS_TOTAL
} from './actions'

const initialState = {}

export function repos(state = initialState, action) {
  switch (action.type) {
    case REQUESTED_USER_REPOS:
      return Object.assign({}, state, undefined)
    case RECEIVED_USER_REPOS:
      return Object.assign({}, state, {
        data: action.payload.repos,
        page: action.payload.page,
        perPage: action.payload.perPage,
        error: false
      })
    case REJECTED_USER_REPOS:
      return Object.assign({}, state, {
        data: [],
        page: action.payload.page,
        perPage: action.payload.perPage,
        error: {message: action.payload.repos}
      })

    case REQUESTED_USER_REPOS_TOTAL:
      return Object.assign({}, state, undefined)
    case RECEIVED_USER_REPOS_TOTAL:
      return Object.assign({}, state, {
        totalRepos: action.payload.totalRepos,
        error: false
      })
    case REJECTED_USER_REPOS_TOTAL:
      return Object.assign({}, state, {
        error: {message: action.payload.repos}
      })

    case CLEARED_USER_REPOS:
      return initialState
    default:
      return state
  }
}
