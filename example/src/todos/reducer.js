import { combineReducers } from 'redux'
import {VisibilityFilters, ADD_TODO, SET_VISIBILITY_FILTER, SHOW_ALL, TOGGLE_TODO} from './actions'

function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

export default combineReducers({
  visibilityFilter
})
