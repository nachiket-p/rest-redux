import { todo } from '../api'

const todoActions = todo.actions
export const ADD_TODO = 'ADD_TODO'
export const TOGGLE_TODO = 'TOGGLE_TODO'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
}

export function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}

export const ActionLinks = {
  //DELETE_ALL: () => (dispatch) => dispatch(todoActions.delete({})),
  DELETE_ALL: () => (dispatch) => dispatch(todoActions.custom('DELETE_ALL', 'deleteTodos', 'POST')).then(response => {
    dispatch(todoActions.find({}))
    dispatch(todoActions.count({}))
  }),
  COMPLETE_ALL: () => (dispatch) => {
    dispatch(todoActions.updateAll({ completed: false }, { completed: true })).then(response => {
      dispatch(todoActions.find({}))
    })
  },
  UNCOMPLETE_ALL: () => (dispatch) => {
    dispatch(todoActions.updateAll({ completed: true }, { completed: false })).then(response => {
      dispatch(todoActions.find({}))
    })
  }
}