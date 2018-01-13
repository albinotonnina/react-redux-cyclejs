import React from 'react'
import PropTypes from 'prop-types'

class LeftPanel extends React.Component {
  static propTypes = {
    documents: PropTypes.array
  }

  render() {
    const {documents} = this.props
    console.log('render left with props: ', this.props)

    return (documents && documents.map(doc => <div key={doc.id}>{doc.name}</div>)) || 'Loading'
  }
}

export default LeftPanel
