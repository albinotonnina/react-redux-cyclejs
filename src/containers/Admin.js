import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {checkAdminAccess} from '../actions'

class Admin extends React.Component {
  static propTypes = {
    checkAdminAccess: PropTypes.func,
    adminAccess: PropTypes.string
  }

  componentDidMount() {
    this.props.checkAdminAccess()
  }

  render() {
    if (!this.props.adminAccess) {
      return <p>Checking access...</p>
    }
    if (this.props.adminAccess === 'GRANTED') {
      return <p>Access granted</p>
    }
    return <p>Access denied. Redirecting back home.</p>
  }
}

const mapStateToProps = ({adminAccess}) => ({
  adminAccess
})

const mapDispatchToProps = {checkAdminAccess}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
