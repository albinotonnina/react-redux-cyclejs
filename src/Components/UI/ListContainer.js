import styled from 'styled-components'

const itemHeight = 96

const ListContainer = styled.div`
  height: 100%;
`

ListContainer.displayName = 'ListContainer'

const ListToolbar = styled.div`
  background: #eee;
  height: ${itemHeight}px;
  display: flex;
  align-items: center;
  padding: 0 15px;
`

ListToolbar.displayName = 'ListToolbar'

const ListItem = styled.div`
  padding: 0 15px;
  border-bottom: 1px solid #eee;
  background: white;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  height: ${itemHeight}px;
`

ListItem.displayName = 'ListItem'
ListItem.itemHeight = itemHeight

export {ListContainer, ListItem, ListToolbar}
