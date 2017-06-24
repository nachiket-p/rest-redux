import { combineReducers } from 'redux'
import { LIST } from '../constants'
const { SET_OPTIONS, PAGE, NEXT, PREV, LAST, FIRST } = LIST
const DEFAULT = {
  offset: 0,
  pageSize: 10,
  total: null,
  result: []
}

export default (model, list) => {
  const reducer = (state = DEFAULT, action) => {
    const { payload } = action
    switch (action.type) {
      case SET_OPTIONS:
        return { ...state, ...payload }
      case PAGE:
        return { ...state, offset: state.pageSize*payload.page }
      default:
        return state
    }
  }

  return reducer
}

