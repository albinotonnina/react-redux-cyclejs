import React from 'react'
import PropTypes from 'prop-types'
import VirtualList from 'react-tiny-virtual-list'
import {ListContainer, ListItem, ListToolbar} from '../UI'

const itemHeight = ListItem.itemHeight

class LeftPanel extends React.Component {
  static propTypes = {
    documents: PropTypes.array
  }

  render() {
    const {documents} = this.props
    console.log(documents)
    return (
      (documents && (
        <ListContainer>
          <ListToolbar>
            <div>Sort, Group</div>
          </ListToolbar>
          <VirtualList
            width="100%"
            height={window.innerHeight}
            itemCount={documents.length}
            itemSize={itemHeight} // Also supports variable heights (array or function getter)
            renderItem={({index, style}) => (
              <ListItem key={index} style={style}>
                {documents[index].name}, Row: #{index}
              </ListItem>
            )}
          />
        </ListContainer>
      )) ||
      'Loading'
    )
  }
}

export default LeftPanel
