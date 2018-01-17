import React from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router-dom'
import styled from 'styled-components'

import SearchRepo from './scenes/SearchRepo'

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const App = () => {
  return (
    <Container>
      <Route path="/" component={SearchRepo} />
    </Container>
  )
}

App.propTypes = {
  children: PropTypes.object
}

export default App
