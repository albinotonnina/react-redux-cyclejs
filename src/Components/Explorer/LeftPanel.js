import React from 'react'
import PropTypes from 'prop-types'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc'
import {ListContainer, ListItem, ListToolbar} from '../UI'
import List from 'react-virtualized/dist/commonjs/List'

const itemHeight = ListItem.itemHeight

const SortableItem = SortableElement(({index, style, value}) => {
  return (
    <ListItem key={index} style={style}>
      {value}
    </ListItem>
  )
})

class VirtualList extends React.Component {
  render() {
    const {items} = this.props

    return (
      <List
        ref={instance => {
          this.List = instance
        }}
        rowHeight={itemHeight}
        rowRenderer={({index, style}) => {
          const {name, id} = items[index]
          return <SortableItem key={id} index={index} value={name} style={style} />
        }}
        rowCount={items.length}
        width={600}
        height={600}
      />
    )
  }
}

/*
 * Important note:
 * To access the ref of a component that has been wrapped with the SortableContainer HOC,
 * you *must* pass in {withRef: true} as the second param. Refs are opt-in.
 */
const SortableList = SortableContainer(VirtualList, {withRef: true})

class LeftPanel extends React.Component {
  state = {
    items: []
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    console.log('oldIndex', oldIndex)
    console.log('newIndex', newIndex)

    if (oldIndex !== newIndex) {
      const {documents} = this.props

      this.setState({
        documents: arrayMove(documents, oldIndex, newIndex)
      })

      // We need to inform React Virtualized that the items have changed heights
      const instance = this.SortableList.getWrappedInstance()

      instance.List.recomputeRowHeights()
      instance.forceUpdate()
    }
  }
  render() {
    const {documents} = this.props

    return (
      (documents && (
        <ListContainer>
          <ListToolbar>
            <div>Sort, Group</div>
          </ListToolbar>
          <SortableList
            ref={instance => {
              this.SortableList = instance
            }}
            items={documents}
            onSortEnd={this.onSortEnd}
          />
        </ListContainer>
      )) ||
      'Loading'
    )
  }
}

class _LeftPanel extends React.Component {
  static propTypes = {
    documents: PropTypes.array
  }

  render() {
    const {documents} = this.props

    return (
      (documents && (
        <ListContainer>
          <ListToolbar>
            <div>Sort, Group</div>
          </ListToolbar>

          <List
            height={500}
            noRowsRenderer={({index, style}) => <div>no render</div>}
            rowCount={documents.length}
            rowHeight={itemHeight}
            rowRenderer={({index, style}) => (
              <ListItem key={index} style={style}>
                {documents[index].name}, Row: #{index}
              </ListItem>
            )}
            width={600}
          />
        </ListContainer>
      )) ||
      'Loading'
    )
  }
}

export default LeftPanel
