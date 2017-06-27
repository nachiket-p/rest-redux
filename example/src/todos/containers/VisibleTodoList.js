import { connect } from 'react-redux'
import TodoList from '../components/TodoList'
import {connectModel} from 'rest-redux'
import {getVisibleTodos, isTodosLoading, getTodosCount} from '../selectors'
import { todo } from '../../api'

const todoActions = todo.actions
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state),
    todosCount: getTodosCount(state),
    loading: isTodosLoading(state)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (todo) => {
      dispatch(todoActions.update(todo.id, {completed: !todo.completed}))
    },
    deleteTodo: (todo) => {
      dispatch(todoActions.deleteById(todo.id)).then(response => {
        dispatch(todoActions.find())
        dispatch(todoActions.count())
      })      
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default connectModel('todos')(VisibleTodoList)