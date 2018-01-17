import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Loader, Pagination} from 'semantic-ui-react'
import Repos from '../components/Repos'
import {requestReposByUser, clearUserRepos, requestTotalReposByUser} from '../data/repos/actions'

class ReposByUser extends React.Component {
  static propTypes = {
    requestReposByUser: PropTypes.func,
    requestTotalReposByUser: PropTypes.func,
    clearUserRepos: PropTypes.func,
    data: PropTypes.array,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    page: PropTypes.number,
    perPage: PropTypes.number,
    totalRepos: PropTypes.number,
    user: PropTypes.string
  }

  componentDidMount() {
    this.props.requestReposByUser(this.props.user, 1)
    this.props.requestTotalReposByUser(this.props.user)
  }

  componentWillReceiveProps(nextProps) {
    const user = this.props.user
    if (user !== nextProps.user) {
      this.props.requestReposByUser(user, 1)
    }
  }

  handlePaginationChange = (event, data) => {
    this.props.requestReposByUser(this.props.user, data.activePage, this.props.perPage)
  }

  render() {
    const {data, user, page, perPage, error, totalRepos} = this.props

    const totalPages = Math.ceil(totalRepos / perPage) || 0
    if (!data) {
      return <Loader active inline size="huge" />
    } else if (error) {
      return <div>{error.message}</div>
    } else {
      return (
        <div>
          <Repos repos={data} user={user} />
          <Pagination activePage={page} onPageChange={this.handlePaginationChange} totalPages={totalPages} />
        </div>
      )
    }
  }
}

const mapStateToProps = ({searchRepo}, ownProps) => ({
  data: searchRepo.data.repos.data,
  totalRepos: searchRepo.data.repos.totalRepos,
  page: searchRepo.data.repos.page,
  perPage: searchRepo.data.repos.perPage,
  error: searchRepo.data.repos.error,
  user: ownProps.match.params.user
})

const mapDispatchToProps = {requestReposByUser, clearUserRepos, requestTotalReposByUser}

export default connect(mapStateToProps, mapDispatchToProps)(ReposByUser)
