import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const App = ({children}) => {
  return <Container>{children}</Container>
}

App.propTypes = {
  children: PropTypes.object
}

export default App
