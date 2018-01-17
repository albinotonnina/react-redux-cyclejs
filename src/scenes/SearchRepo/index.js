import React from 'react'

import {Switch, Route} from 'react-router-dom'
import ReposByUser from './containers/ReposByUser'
import UserSearch from './containers/UserSearch'

const Component = () => (
  <Switch>
    <Route exact path="/" component={UserSearch} />
    <Route path="/repos/:user" component={ReposByUser} />
  </Switch>
)

export default Component
