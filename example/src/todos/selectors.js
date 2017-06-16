import { createSelector } from 'reselect'
import _ from 'lodash'
export const getTodos = state => _.values(state.loopback.todos.instances)
export const isTodosLoading = state => state.loopback.todos.request.loading

export const getFilter = state => state.todos.visibilityFilter

export const getVisibleTodos = createSelector(
  getTodos, getFilter, (todos, filter) => {
    switch (filter) {
      case 'SHOW_ALL':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed)
    }
  }
)

