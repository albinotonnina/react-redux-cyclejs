export const REQUESTED_USER_REPOS = 'SearchRepo/data/repos/REQUESTED'
export const RECEIVED_USER_REPOS = 'SearchRepo/data/repos/RECEIVED'
export const REJECTED_USER_REPOS = 'SearchRepo/data/repos/REJECTED'
export const CLEARED_USER_REPOS = 'SearchRepo/data/repos/CLEARED'

export function requestReposByUser(user, page) {
  return {
    type: REQUESTED_USER_REPOS,
    payload: {
      user,
      page
    }
  }
}

export function receiveUserRepos(user, repos, page, error) {
  return {
    type: error ? REJECTED_USER_REPOS : RECEIVED_USER_REPOS,
    payload: {
      user,
      repos,
      page,
      error
    }
  }
}

export function clearUserRepos() {
  return {
    type: CLEARED_USER_REPOS
  }
}
