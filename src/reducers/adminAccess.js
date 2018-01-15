import * as ActionTypes from '../ActionTypes'

const DENIED = 'DENIED'

export default function adminAccess(state = null, action) {
  switch (action.type) {
    case ActionTypes.CHECKED_ADMIN_ACCESS:
      return DENIED
    default:
      return state
  }
}
