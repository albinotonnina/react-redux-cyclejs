import xs from 'xstream'
import {assertSourcesSinks} from '~/config/test.helpers'
import * as actions from '../actions'

import {searchUsers} from '../cycles'

describe('Cycles', () => {
  describe('searchUsers', () => {
    it('should emit HTTP requests given many debounced ACTIONs, and should emit ACTION given HTTP response', done => {
      const actionSource = {
        a: actions.searchUsers('l'),
        b: actions.searchUsers('lu'),
        c: actions.searchUsers('luc')
      }
      const httpSource = {
        select: () => ({
          r: xs.of({body: {items: ['foo']}})
        })
      }
      const httpSink = {
        a: {
          url: `https://api.github.com/search/users?q=luc`,
          category: 'query'
        }
      }
      const actionSink = {
        r: actions.receiveUsers(['foo'])
      }

      assertSourcesSinks(
        {
          ACTION: {'-a-b-c----|': actionSource},
          HTTP: {'---r------|': httpSource}
        },
        {
          HTTP: {'---------a|': httpSink},
          ACTION: {'---r------|': actionSink}
        },
        searchUsers,
        done,
        {interval: 200}
      )
    })
  })
})
