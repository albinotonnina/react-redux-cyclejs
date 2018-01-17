export const RECEIVED_USERS = 'SearchRepo/data/users/RECEIVED'
export const CLEARED_SEARCH_RESULTS = 'SearchRepo/data/users/CLEAR'
export const SEARCHED_USERS = 'SearchRepo/data/users/SEARCH'

export function searchUsers(query) {
  return {
    type: SEARCHED_USERS,
    payload: {
      query
    }
  }
}

export function receiveUsers(users) {
  return {
    type: RECEIVED_USERS,
    payload: {
      users
    }
  }
}

export function clearSearchResults() {
  return {
    type: CLEARED_SEARCH_RESULTS
  }
}
