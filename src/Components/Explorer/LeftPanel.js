import React from 'react'
import PropTypes from 'prop-types'
import VirtualList from 'react-tiny-virtual-list'

class LeftPanel extends React.Component {
  static propTypes = {
    documents: PropTypes.array
  }

  render() {
    const {documents} = this.props
console.log(documents);
    return (
      (documents && (
        <VirtualList
          width="100%"
          height={600}
          itemCount={documents.length}
          itemSize={50} // Also supports variable heights (array or function getter)
          renderItem={({index, style}) => (
            <div key={index} style={style}>
              Letter: {documents[index].name}, Row: #{index}
            </div>
          )}
        />
      )) ||
      'Loading'
    )
  }
}

export default LeftPanel
