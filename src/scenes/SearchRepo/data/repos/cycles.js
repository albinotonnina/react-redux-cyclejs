import * as actions from './actions'

import xs from 'xstream'
// import fromEvent from 'xstream/extra/fromEvent'

export function fetchReposByUser(sources) {
  const user$ = sources.ACTION.filter(action => action.type === actions.REQUESTED_USER_REPOS).map(action => ({
    user: action.payload.user,
    page: action.payload.page,
    perPage: action.payload.perPage
  }))

  const request$ = user$.map(({user, page, perPage}) => ({
    url: `https://api.github.com/users/${user}/repos?page=${page}&per_page=${perPage}`,
    // url: `https://httpstat.us/500`,
    category: 'repos',
    github_user: user
  }))

  const errorObject = new Error('Whoops!')

  const response$ = sources.HTTP.select('repos')
    .map(response$ => response$.replaceError(() => xs.of(errorObject)))
    .flatten()

  const action$ = xs
    .combine(response$, user$)
    .filter(arr => {
      return arr[0].request ? arr[0].request.github_user === arr[1].user : true
    })
    .map(arr => {
      const isError = arr[0] instanceof Error

      if (isError) {
        return actions.receiveUserRepos(arr[1].user, arr[0].message, arr[1].page, isError, arr[1].perPage)
      }

      return actions.receiveUserRepos(arr[1].user, arr[0].body, arr[1].page, isError, arr[1].perPage)
    })

  return {
    ACTION: action$,
    HTTP: request$
  }
}

export function fetchTotalReposByUser(sources) {
  const user$ = sources.ACTION.filter(action => action.type === actions.REQUESTED_USER_REPOS_TOTAL).map(action => ({
    user: action.payload.user,
    page: action.payload.page,
    perPage: action.payload.perPage
  }))

  const request$ = user$.map(({user, page, perPage}) => ({
    url: `https://api.github.com/users/${user}/repos?page=${page}&per_page=${perPage}`,
    // url: `https://httpstat.us/500`,
    category: 'totalrepos',
    github_user: user
  }))

  const errorObject = new Error('Whoops!')

  const response$ = sources.HTTP.select('totalrepos')
    .map(response$ => response$.replaceError(() => xs.of(errorObject)))
    .flatten()

  const action$ = xs
    .combine(response$, user$)
    .filter(arr => {
      return arr[0].request ? arr[0].request.github_user === arr[1].user : true
    })
    .map(arr => {
      const isError = arr[0] instanceof Error

      if (isError) {
        return actions.receiveTotalUserRepos(arr[1].user, arr[0].message, arr[1].page, isError)
      }

      return actions.receiveTotalUserRepos(arr[1].user, arr[0].body.length, arr[1].page, isError)
    })

  return {
    ACTION: action$,
    HTTP: request$
  }
}
