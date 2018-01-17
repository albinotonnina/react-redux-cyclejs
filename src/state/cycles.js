import {combineCycles} from 'redux-cycles'
import {fetchReposByUser, searchUsers, clearSearchResults, fetchTotalReposByUser} from '../scenes/SearchRepo/cycles'

export default combineCycles(fetchReposByUser, searchUsers, clearSearchResults, fetchTotalReposByUser)
