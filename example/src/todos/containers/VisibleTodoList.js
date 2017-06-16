import { connect } from 'react-redux'
import TodoList from '../components/TodoList'
import {connectModel} from 'loopback-redux'
import {createActions} from 'loopback-redux'
import {getVisibleTodos, isTodosLoading} from '../selectors'
const todoActions = createActions('todos')

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state),
    loading: isTodosLoading(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (todo) => {
      dispatch(todoActions.update(todo.id, {completed: !todo.completed}))
    },
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default connectModel('todos')(VisibleTodoList)