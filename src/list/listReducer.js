import { combineReducers } from 'redux'
import { LIST, RESPONSE, CLEAR } from '../constants'
const { SET_OPTIONS, PAGE, NEXT, PREV, LAST, FIRST, SET_PARAMS } = LIST
const DEFAULT = {
  offset: 0,
  pageSize: 10,
  total: null,
  result: [],
  headers: {},
  params: {}
}

export function listReducer(model, list) {
  const defaultState = { ...DEFAULT, ...list.options }
  const reducer = (state = defaultState, { payload, type }) => {
    //REJECT actions without payloads & modelName
    if (!payload || !payload.modelName) {
      return state
    }

    if (payload.modelName !== model.modelName || payload.listName !== list.name) {
      if (payload.modelName == model.modelName && type == CLEAR) {
        return { ...defaultState }
      }
      return state
    }

    console.log('reducing for ', list.name, payload.listName, payload.modelName, model.modelName);
    switch (type) {
      case SET_OPTIONS:
        return { ...state, ...payload }
      case SET_PARAMS:
        return { ...state, params: { ...state.params, ...payload } }
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
  if (!model.lists) {
    return {}
  }
  const listReducers = {};
  model.lists.forEach(list => listReducers[list.name] = listReducer(model, list))
  return combineReducers(listReducers)
}