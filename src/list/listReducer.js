import { combineReducers } from 'redux'
import { LIST, RESPONSE } from '../constants'
const { SET_OPTIONS, PAGE, NEXT, PREV, LAST, FIRST } = LIST
const DEFAULT = {
  offset: 0,
  pageSize: 10,
  total: null,
  result: []
}

export function listReducer(model, list) {
  const reducer = (state = DEFAULT, { payload, type }) => {
    if (payload && payload.modelName !== model.modelName && payload.listName !== list.name) {
      return state
    }
    
    switch (type) {
      case SET_OPTIONS:
        return { ...state, ...payload }
      case PAGE:
        return { ...state, offset: state.pageSize * payload.page }
      case RESPONSE.FIND:
        return { ...state, result: payload.ids }
      default:
        return state
    }
  }

  return reducer
}

export function createListReducers(model) {
  if(!model.lists) {
    return {}
  }
  const listReducers = {};
  model.lists.forEach(list => listReducers[list.name] = listReducer(model, list) )
  return combineReducers(listReducers)
}