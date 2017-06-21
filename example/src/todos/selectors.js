// import { createSelector } from 'reselect'
import _ from 'lodash'
import {todo} from '../api'
const todoSelectors = todo.selectors

export const isTodosLoading = todoSelectors.isLoading
export const getTodosCount = todoSelectors.getCount

export const getFilter = state => state.todos.visibilityFilter

export const getVisibleTodos = state => {
    const todos = todoSelectors.getAll(state)
    const filter = getFilter(state)
    switch (filter) {
      case 'SHOW_ALL':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed)
    }
  }


// export const getVisibleTodos = createSelector(
//   getTodos, getFilter, (todos, filter) => {
//     switch (filter) {
//       case 'SHOW_ALL':
//         return todos
//       case 'SHOW_COMPLETED':
//         return todos.filter(t => t.completed)
//       case 'SHOW_ACTIVE':
//         return todos.filter(t => !t.completed)
//     }
//   }
// )

