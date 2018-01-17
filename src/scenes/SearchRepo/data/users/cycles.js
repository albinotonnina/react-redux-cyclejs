import * as actions from './actions'

export function searchUsers(sources) {
  const searchQuery$ = sources.ACTION.filter(action => action.type === actions.SEARCHED_USERS)
    .map(action => action.payload.query)
    .filter(q => !!q)
    .map(q =>
      sources.Time.periodic(800)
        .take(1)
        .mapTo(q)
        .endWhen(sources.ACTION.filter(action => action.type === actions.CLEARED_SEARCH_RESULTS))
    )
    .flatten()

  const searchQueryRequest$ = searchQuery$.map(q => ({
    url: `https://api.github.com/search/users?q=${q}`,
    category: 'query'
  }))

  const searchQueryResponse$ = sources.HTTP.select('query')
    .flatten()
    .map(res => res.body.items)
    .map(actions.receiveUsers)

  return {
    ACTION: searchQueryResponse$,
    HTTP: searchQueryRequest$
  }
}

export function clearSearchResults(sources) {
  const clear$ = sources.ACTION.filter(action => action.type === actions.SEARCHED_USERS)
    .filter(action => !!!action.payload.query)
    .map(actions.clearSearchResults)

  return {
    ACTION: clear$
  }
}
