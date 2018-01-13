import styled from 'styled-components'

const FlexContainer = styled.div`
  display: flex;
  height: ${props => (props.height ? props.height : '100vh')};
  width: ${props => (props.width ? props.width : '100vw')};
`

FlexContainer.displayName = 'FlexContainer'

const FlexItem = styled.div`
  flex: ${props => `${props.grow ? 1 : 0} ${props.shrink ? 1 : 0} ${props.basis ? props.basis : 'auto'}`};
  max-width: ${props => `${!props.grow && !props.shrink && props.basis ? props.basis : 'auto'}`};
`
FlexItem.displayName = 'FlexItem'

export {FlexContainer, FlexItem}
