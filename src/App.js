import React from 'react'
import PropTypes from 'prop-types'
import {Switch, Route} from 'react-router-dom'
import styled from 'styled-components'

import ReposByUser from './scenes/SearchRepo/containers/ReposByUser'
import UserSearch from './scenes/SearchRepo/containers/UserSearch'

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const App = () => {
  return (
    <Container>
      <Switch>
        <Route exact path="/" component={UserSearch} />
        <Route path="/repos/:user" component={ReposByUser} />
      </Switch>
    </Container>
  )
}

App.propTypes = {
  children: PropTypes.object
}

export default App