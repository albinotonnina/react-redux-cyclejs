import React from 'react'
import styled from 'styled-components'
import {FlexContainer as Container, FlexItem} from '../UI'

const Item = styled(FlexItem)`
  margin: 16px;
  background: rgba(255, 255, 255, 0.4);
`

class ExplorerLayout extends React.Component {
  render() {
    return (
      <Container height="100vh" width="100vw">
        <Item grow={false} shrink={true} basis="30%">
          {this.props.renderLeft()}
        </Item>
        <Item grow={false} shrink={true} basis="70%">
          {this.props.renderRight()}
        </Item>
      </Container>
    )
  }
}

const Component = () => <div>Hello</div>

class Explorer extends React.Component {
  render() {
    return <ExplorerLayout renderLeft={() => <Component />} renderRight={() => <Component />} />
  }
}

export default Explorer
