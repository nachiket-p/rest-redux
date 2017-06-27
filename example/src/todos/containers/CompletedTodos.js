import { paging } from 'rest-redux'
import PagingTodos from '../components/PagingTodos'
import { completedTodos } from '../../api'

export default paging(completedTodos)(PagingTodos)