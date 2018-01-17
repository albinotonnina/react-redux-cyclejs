export const REQUESTED_USER_REPOS = 'SearchRepo/data/repos/REQUESTED'
export const RECEIVED_USER_REPOS = 'SearchRepo/data/repos/RECEIVED'
export const REJECTED_USER_REPOS = 'SearchRepo/data/repos/REJECTED'
export const CLEARED_USER_REPOS = 'SearchRepo/data/repos/CLEARED'
export const REQUESTED_USER_REPOS_TOTAL = 'SearchRepo/data/repos/REQUEST_TOTAL'
export const RECEIVED_USER_REPOS_TOTAL = 'SearchRepo/data/repos/RECEIVED_TOTAL'
export const REJECTED_USER_REPOS_TOTAL = 'SearchRepo/data/repos/REJECTED_USER_REPOS'

export function requestReposByUser(user, page, perPage = 10) {
  return {
    type: REQUESTED_USER_REPOS,
    payload: {
      user,
      page,
      perPage
    }
  }
}

export function receiveUserRepos(user, repos, page, error, perPage) {
  return {
    type: error ? REJECTED_USER_REPOS : RECEIVED_USER_REPOS,
    payload: {
      user,
      repos,
      page,
      perPage,
      error
    }
  }
}
export function requestTotalReposByUser(user, page = 1, perPage = 9999) {
  return {
    type: REQUESTED_USER_REPOS_TOTAL,
    payload: {
      user,
      page,
      perPage
    }
  }
}

export function receiveTotalUserRepos(user, totalRepos, page, error, perPage) {
  return {
    type: error ? REJECTED_USER_REPOS_TOTAL : RECEIVED_USER_REPOS_TOTAL,
    payload: {
      user,
      totalRepos,
      error
    }
  }
}

export function clearUserRepos() {
  return {
    type: CLEARED_USER_REPOS
  }
}
