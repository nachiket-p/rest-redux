import { paging } from 'rest-redux'
import PagingTodos from '../components/PagingTodos'
import { incompleteTodos } from '../../api'

export default paging(incompleteTodos, {}, {
  title: 'Incomplete Todos'
})(PagingTodos)