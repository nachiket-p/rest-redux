import { schema, normalize } from 'normalizr'
import { combineReducers } from 'redux'
import _ from 'lodash'
import { REQUEST, RESPONSE, ERROR, SELECTED, RECEIVED, CLEAR } from '../constants'
import { createListReducers } from '../list/listReducer'

export default (model) => {
  const instances = (state = {}, { type, payload }) => {
    if (payload && payload.modelName !== model.modelName) {
      return state
    }
    switch (type) {
      case RECEIVED:
        return { ...state, ...payload.instances }
      case RESPONSE.DELETE_BY_ID:
      case RESPONSE.DELETE:
        const newState = { ...state }
        return _.pick(newState, _.difference(_.keys(newState), [payload.id]))
      case CLEAR:
        return {}
      default:
        return state
    }
  }

  const error = (state = null, { type, payload }) => {
    if (payload && payload.modelName !== model.modelName) {
      return state
    }
    switch (type) {
      case ERROR:
        return payload
      case CLEAR:
        return null
      default:
        return state
    }
  }

  const DEFAULT_REQUEST = { loading: false }
  const request = (state = DEFAULT_REQUEST, { type, payload }) => {
    if (payload && payload.modelName !== model.modelName) {
      return state
    }
    switch (type) {
      case REQUEST.FIND:
      case REQUEST.FIND_BY_ID:
      case REQUEST.CREATE:
      case REQUEST.UPDATE:
      case REQUEST.DELETE_BY_ID:
      case REQUEST.DELETE:
      case REQUEST.CUSTOM:
        return { ...state, loading: true }
      case RESPONSE.FIND:
      case RESPONSE.FIND_BY_ID:
      case RESPONSE.CREATE:
      case RESPONSE.UPDATE:
      case RESPONSE.DELETE_BY_ID:
      case RESPONSE.DELETE:
      case RESPONSE.CUSTOM:
      case ERROR:
        return { ...state, loading: false }
      case CLEAR:
        return { ...DEFAULT_REQUEST }
      default:
        return state
    }
  }

  const DEFAULT_LAST_STATE = { }
  const last = (state = DEFAULT_LAST_STATE, { type, payload }) => {
    if(!payload) { 
      return state
    }

    if (payload.modelName !== model.modelName ) {
      return state
    }

    if (payload.listName || !payload.apiPath) {
      return state
    }

    const apiPath = payload.apiPath
    switch (type) {
      case RESPONSE.FIND:
        return { ...state, [apiPath]:{ ...state[apiPath], find: payload.ids }}
      case RESPONSE.FIND_BY_ID:
        return { ...state, [apiPath]:{ ...state[apiPath], findById: payload.id }}
      case RESPONSE.CREATE:
        return { ...state, [apiPath]:{ ...state[apiPath], create: payload.id }}
      case RESPONSE.UPDATE:
        return { ...state, [apiPath]:{ ...state[apiPath], update: payload.id }}
      case RESPONSE.UPDATE_ALL:
        return { ...state, [apiPath]:{ ...state[apiPath], updateAll: payload.count }}
      case RESPONSE.COUNT:
        return { ...state, [apiPath]:{ ...state[apiPath], count: payload.count }}
      case RESPONSE.DELETE_BY_ID:
        //case RESPONSE.DELETE:
        const newState = { ...state, [apiPath]:{ ...state[apiPath], deleteById: payload.id }}
        if (newState[apiPath].findById == payload.id) newState[apiPath].findById = null
        if (newState[apiPath].create == payload.id) newState[apiPath].create = null
        if (newState[apiPath].update == payload.id) newState[apiPath].update = null
        if (newState[apiPath].find && newState[apiPath].find.indexOf(payload.id) > -1) {
          newState[apiPath].find = newState[apiPath].find.filter(id => id !== payload.id)
        }
        return newState
      case RESPONSE.CUSTOM:
        const oldCustom = state[apiPath] ? state[apiPath].custom : {} 
        return { ...state, [apiPath]:{ ...state[apiPath], custom: { ...oldCustom, [payload.name]: payload.response } } }
      case CLEAR:
        return { ...DEFAULT_LAST_STATE }
      default:
        return state
    }
  }
  //console.log('listREducer', listReducer)
  return combineReducers({
    instances,
    last,
    request,
    error,
    lists: createListReducers(model)
  })
}