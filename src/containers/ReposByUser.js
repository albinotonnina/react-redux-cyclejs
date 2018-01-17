import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Loader} from 'semantic-ui-react'
import Repos from '../components/Repos'
import {requestReposByUser, clearUserRepos} from '../actions'

class ReposByUser extends React.Component {
  static propTypes = {
    requestReposByUser: PropTypes.func,
    clearUserRepos: PropTypes.func,
    reposByUser: PropTypes.object,
    user: PropTypes.string
  }

  componentDidMount() {
    this.props.requestReposByUser(this.props.user)
  }

  componentWillReceiveProps(nextProps) {
    const user = this.props.user
    if (user !== nextProps.user) {
      this.props.requestReposByUser(user)
    }
  }

  render() {
    const {reposByUser, user} = this.props

    if (!reposByUser[user]) {
      return <Loader active inline size="huge" />
    } else {
      return <Repos repos={reposByUser[user]} user={user} />
    }
  }
}

const mapStateToProps = ({reposByUser}, ownProps) => {
  return {
    reposByUser,
    user: ownProps.match.params.user
  }
}

const mapDispatchToProps = {requestReposByUser, clearUserRepos}

export default connect(mapStateToProps, mapDispatchToProps)(ReposByUser)
