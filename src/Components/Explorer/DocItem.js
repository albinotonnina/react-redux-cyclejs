import React from 'react'
import PropTypes from 'prop-types'
import {SortableHandle} from 'react-sortable-hoc'
import {ListItem} from '../UI'

const DragHandleUI = () => <span> :: </span>
const DragHandle = SortableHandle(DragHandleUI)






class DocItem extends React.Component {
  static propTypes = {
    index: PropTypes.number,
    style: PropTypes.object,
    data: PropTypes.object
  }

  render() {
    const {index, style, data} = this.props
    return (
      <ListItem key={index} style={style}>
        <DragHandle />
        {data.name}
        <a href="">{data.id}</a>
        <a href="">{data.id}</a>
        <a href="">{data.id}</a>
      </ListItem>
    )
  }
}

const DocItemHeight = ListItem.itemHeight

export {DocItemHeight}
export default DocItem
