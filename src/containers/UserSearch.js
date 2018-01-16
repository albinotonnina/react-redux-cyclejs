import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router'

import {searchUsers} from '../actions'
import {Search, Item} from 'semantic-ui-react'

const resultRenderer = ({login, avatarurl, score}) => (
  <Link to={`/repos/${login}`}>
    {' '}
    <Item>
      <Item.Image size="tiny" src={avatarurl} />

      <Item.Content>
        <Item.Header>{login}</Item.Header>

        <Item.Meta>Score: {score}</Item.Meta>
      </Item.Content>
    </Item>
  </Link>
)

class UserSearch extends React.Component {
  state = {
    value: '',
    loading: false
  }

  static propTypes = {
    searchUsers: PropTypes.func,
    clearSearchResults: PropTypes.func,
    results: PropTypes.array,
    searchInFlight: PropTypes.bool,
    query: PropTypes.string
  }

  componentDidMount() {
    this.handleSearchChange(this.props.query)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.query !== nextProps.query) {
      this.handleSearchChange(nextProps.query)
    }
  }

  handleSearchChange = (e, {value} = {value: ''}) => {
    this.setState({isLoading: true, value})
    this.props.searchUsers(value)
  }

  handleResultSelect = (e, {result}) => {
    this.setState({value: result.login})
  }

  render() {
    const {results, searchInFlight} = this.props
    const {value} = this.state
    const mappedResults = results.map(result => ({
      login: result.login,
      avatarurl: result.avatar_url,
      score: result.score,
      key: result.login
    }))

    return (
      <div>
        <Search
          loading={searchInFlight}
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          results={mappedResults}
          value={value}
          resultRenderer={resultRenderer}
        />
      </div>
    )
  }
}

const mapStateToProps = ({routing, userResults, searchInFlight}) => ({
  query: routing.locationBeforeTransitions.query.q,
  results: userResults,
  searchInFlight
})

const mapDispatchToProps = {searchUsers}

export default connect(mapStateToProps, mapDispatchToProps)(UserSearch)
