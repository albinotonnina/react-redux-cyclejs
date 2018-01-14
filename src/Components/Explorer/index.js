import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {FlexContainer as Container, FlexItem} from '../UI'
import {ExplorerBroadcast, ExplorerSubscriber} from './Broadcasts'

import LeftPanel from './LeftPanel.js'
import RightPanel from './RightPanel.js'

const Item = styled(FlexItem)`
  background: rgba(255, 255, 255, 0.4);
`

class ExplorerLayout extends React.Component {
  static propTypes = {
    renderLeft: PropTypes.func,
    renderRight: PropTypes.func
  }

  static defaultProps = {
    renderLeft: () => {},
    renderRight: () => {}
  }

  render() {
    return (
      <Container height="100vh" width="100vw">
        <Item grow={false} shrink={false} basis="50%">
          {this.props.renderLeft()}
        </Item>
        <Item grow={false} shrink={false} basis="50%">
          {this.props.renderRight()}
        </Item>
      </Container>
    )
  }
}

class ExplorerProvider extends React.Component {
  state = {loading: true}

  fetchDocuments = async () => {
    var response = await fetch('/api/documents')
    var documents = await response.json()

    this.setState({loading: false, documents: documents})
  }

  componentDidMount() {
    this.fetchDocuments()
  }

  render() {
    return <ExplorerBroadcast value={this.state}>{this.props.children}</ExplorerBroadcast>
  }
}

class Explorer extends React.Component {
  render() {
    return (
      <ExplorerProvider>
        <ExplorerLayout
          renderLeft={() => <ExplorerSubscriber>{props => <LeftPanel {...props} />}</ExplorerSubscriber>}
          renderRight={() => <ExplorerSubscriber>{props => <RightPanel {...props} />}</ExplorerSubscriber>}
        />
      </ExplorerProvider>
    )
  }
}

export default Explorer
