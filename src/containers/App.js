import React from 'react'
import styled from 'styled-components'

const Container = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

export default function App({children}) {
  return <Container>{children}</Container>
}
