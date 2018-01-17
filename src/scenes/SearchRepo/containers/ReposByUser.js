import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Loader, Pagination} from 'semantic-ui-react'
import Repos from '../components/Repos'
import {requestReposByUser, clearUserRepos} from '../data/repos/actions'

class ReposByUser extends React.Component {
  static propTypes = {
    requestReposByUser: PropTypes.func,
    clearUserRepos: PropTypes.func,
    data: PropTypes.array,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    user: PropTypes.string
  }

  componentDidMount() {
    this.props.requestReposByUser(this.props.user, 1)
  }

  componentWillReceiveProps(nextProps) {
    const user = this.props.user
    if (user !== nextProps.user) {
      this.props.requestReposByUser(user, 1)
    }
  }

  render() {
    const {data, user, error} = this.props

    if (!data) {
      return <Loader active inline size="huge" />
    } else if (error) {
      return <div>{error.message}</div>
    } else {
      return <Repos repos={data} user={user} />
    }
  }
}

const mapStateToProps = ({searchRepo}, ownProps) => ({
  data: searchRepo.data.repos.data,
  error: searchRepo.data.repos.error,
  user: ownProps.match.params.user
})

const mapDispatchToProps = {requestReposByUser, clearUserRepos}

export default connect(mapStateToProps, mapDispatchToProps)(ReposByUser)
