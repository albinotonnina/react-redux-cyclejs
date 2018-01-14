import React from 'react'

import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc'
import DocItem, {DocItemHeight} from './DocItem'
import {ListContainer, ListToolbar} from '../UI'
import List from 'react-virtualized/dist/commonjs/List'
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'

const itemHeight = DocItemHeight

class VirtualList extends React.Component {
  render() {
    const {items, sizes} = this.props

    return (
      <List
        ref={instance => {
          this.List = instance
        }}
        rowHeight={itemHeight}
        rowRenderer={({index, style}) => {
          const {name, id} = items[index]
          return <SortableItem key={id} index={index} data={items[index]} style={style} />
        }}
        rowCount={items.length}
        width={sizes.width}
        height={sizes.height}
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
const SortableItem = SortableElement(DocItem)

const ListLayout = ({documents, onSortEnd, doRef}) => (
  <ListContainer>
    <ListToolbar>
      <div>Sort, Group</div>
    </ListToolbar>
    <AutoSizer>
      {({height, width}) => (
        <SortableList
          ref={doRef}
          items={documents}
          useDragHandle={true}
          helperClass="sorting"
          sizes={{width, height}}
          onSortEnd={onSortEnd}
        />
      )}
    </AutoSizer>
  </ListContainer>
)

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
        <ListLayout
          documents={documents}
          onSortEnd={this.onSortEnd}
          doRef={instance => {
            this.SortableList = instance
          }}
        />
      )) ||
      'Loading'
    )
  }
}

export default LeftPanel
