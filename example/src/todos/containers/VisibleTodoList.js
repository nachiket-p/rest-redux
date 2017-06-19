import { connect } from 'react-redux'
import TodoList from '../components/TodoList'
import {connectModel} from 'redux-loopback'
import {getVisibleTodos, isTodosLoading} from '../selectors'
import { todoActions } from '../../api'

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
    deleteTodo: (todo) => {
      dispatch(todoActions.delete(todo.id))      
    },
    deleteAll: (todo) => {
      dispatch(todoActions.deleteAll({}))      
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default connectModel('todos')(VisibleTodoList)