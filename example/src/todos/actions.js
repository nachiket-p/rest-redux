import { todoActions } from '../api'

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
  DELETE_ALL: () => (dispatch) => dispatch(todoActions.deleteAll({})),
  COMPLETE_ALL: () => (dispatch) => dispatch(todoActions.updateAll({completed:false}, {completed: true})),
  UNCOMPLETE_ALL: () => (dispatch) => dispatch(todoActions.updateAll({completed:true}, {completed: false})),
}