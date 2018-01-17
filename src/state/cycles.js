import {combineCycles} from 'redux-cycles'
import {fetchReposByUser, searchUsers, clearSearchResults} from '../scenes/SearchRepo/cycles'

export default combineCycles(fetchReposByUser, searchUsers, clearSearchResults)
