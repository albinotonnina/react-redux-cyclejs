import xs from 'xstream'
import {assertSourcesSinks} from '~/config/test.helpers'
import * as actions from '../actions'

import {fetchReposByUser} from '../cycles'

describe('Cycles', () => {
  describe('fetchReposByUser', () => {
    it('should emit HTTP requests given ACTIONs', done => {
      const user1 = 'lmatteis'
      const user2 = 'luca'

      const actionSource = {
        a: actions.requestReposByUser(user1, 1),
        b: actions.requestReposByUser(user2, 2)
      }

      const httpSource = {
        select: () => null
      }

      const httpSink = {
        x: {
          url: `https://api.github.com/users/${user1}/repos?page=1`,
          category: 'users',
          github_user: user1
        },
        y: {
          url: `https://api.github.com/users/${user2}/repos?page=2`,
          category: 'users',
          github_user: user2
        }
      }

      // Asserts that the sources, trigger the provided sinks,
      // when executing the fetchReposByUser function
      assertSourcesSinks(
        {
          ACTION: {'ab|': actionSource},
          HTTP: {'--|': httpSource}
        },
        {
          HTTP: {'xy|': httpSink}
        },
        fetchReposByUser,
        done
      )
    })

    it('should emit ACTION given HTTP response', done => {
      const user1 = 'lmatteis'
      // const user2 = 'luca'

      const response = {request: {github_user: user1}, body: {foo: 'bar'}}

      const actionSource = {
        a: actions.requestReposByUser(user1, 1)
      }

      const httpSource = {
        select: () => ({
          r: xs.of(response)
        })
      }

      const actionSink = {
        a: actions.receiveUserRepos(user1, response.body, 1, false)
      }

      assertSourcesSinks(
        {
          ACTION: {'a|': actionSource},
          HTTP: {'r|': httpSource}
        },
        {
          ACTION: {'a|': actionSink}
        },
        fetchReposByUser,
        done
      )
    })

    it('should emit ACTION with ERROR given HTTP response', done => {
      const user1 = 'lmatteis'

      const actionSource = {
        a: actions.requestReposByUser(user1, 1)
      }

      const httpSource = {
        select: () => ({
          r: xs.of(new Error('Whoops'))
        })
      }

      const actionSink = {
        a: actions.receiveUserRepos(user1, 'Whoops', 1, true)
      }

      assertSourcesSinks(
        {
          ACTION: {'a|': actionSource},
          HTTP: {'r|': httpSource}
        },
        {
          ACTION: {'a|': actionSink}
        },
        fetchReposByUser,
        done
      )
    })
  })
})
