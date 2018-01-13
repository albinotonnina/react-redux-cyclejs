import React from 'react'

class RightPanel extends React.Component {
  render() {
    console.log('render right with props: ', this.props)

    return JSON.stringify(this.props) || 'Loading'
  }
}

export default RightPanel
