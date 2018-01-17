import React from 'react'
import PropTypes from 'prop-types'
import {List} from 'semantic-ui-react'

const Repos = ({repos, user}) => {
  return (
    <List divided relaxed>
      {repos.length ? (
        repos.map(repo => (
          <List.Item key={repo.id}>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header as="a" href={repo.html_url}>
                {repo.full_name}
              </List.Header>
              <List.Description>This is a {repo.fork ? 'fork': 'repo'}</List.Description>
            </List.Content>
          </List.Item>
        ))
      ) : (
        <p>{user} has no repos</p>
      )}
    </List>
  )
}

Repos.propTypes = {
  repos: PropTypes.array,
  user: PropTypes.string
}

export default Repos
