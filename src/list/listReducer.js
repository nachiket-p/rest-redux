import { combineReducers } from 'redux'
import { LIST, RESPONSE } from '../constants'
const { SET_OPTIONS, PAGE, NEXT, PREV, LAST, FIRST } = LIST
const DEFAULT = {
  offset: 0,
  pageSize: 10,
  total: null,
  result: [],
  headers: {},
  params: {}
}

export function listReducer(model, list) {
  const defaultState = {...DEFAULT, ...list.options}
  const reducer = (state = defaultState, { payload, type }) => {
    //REJECT actions withouts listName
    if(!payload || !payload.listName) {
      return state
    }
    
    if (payload.modelName !== model.modelName || payload.listName !== list.name) {
      return state
    }
    console.log('reducing for ', list.name, payload.listName, payload.modelName, model.modelName);
    switch (type) {
      case SET_OPTIONS:
        return { ...state, ...payload }
      case PAGE:
        return { ...state, offset: state.pageSize * payload.page }
      case RESPONSE.FIND:
        return { ...state, result: payload.ids }
      case RESPONSE.COUNT:
        return { ...state, total: payload.count }
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