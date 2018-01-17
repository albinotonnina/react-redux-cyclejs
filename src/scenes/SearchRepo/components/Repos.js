import React from 'react'
import PropTypes from 'prop-types'

const Repos = ({repos, user}) => {
  return (
    <ul>
      {repos.length ? (
        repos.map(repo => (
          <li key={repo.id}>
            <a href={repo.html_url} target="__blank">
              {repo.full_name}
            </a>
          </li>
        ))
      ) : (
        <p>{user} has no repos</p>
      )}
    </ul>
  )
}

Repos.propTypes = {
  repos: PropTypes.array,
  user: PropTypes.string
}

export default Repos
