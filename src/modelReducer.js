import { schema, normalize } from 'normalizr'
import { combineReducers } from 'redux'
import _ from 'lodash'
import { REQUEST, RESPONSE, ERROR, SELECTED, RECEIVED } from './constants'

export default (entity) => {
    const instances = (state = {}, { type, payload }) => {
        if (payload && payload.modelName !== entity.modelName) {
            return state
        }
        switch (type) {
            case RECEIVED:
                return { ...state, ...payload.instances }
            case RESPONSE.DELETE_BY_ID:
            case RESPONSE.DELETE:
                const newState = { ...state }
                return _.pick(newState, _.difference(_.keys(newState), [payload.id]))
            default:
                return state
        }
    }

    const error = (state = null, { type, payload }) => {
        if (payload && payload.modelName !== entity.modelName) {
            return state
        }
        switch (type) {
            case ERROR:
                return payload
            default:
                return state
        }
    }

    const DEFAULT_REQUEST = { loading: false }
    const request = (state = DEFAULT_REQUEST, { type, payload }) => {
        if (payload && payload.modelName !== entity.modelName) {
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
            default:
                return state
        }
    }

    const DEFAULT_LAST_STATE = {find: [], delete: [], custom: {}}
    const last = (state = DEFAULT_LAST_STATE, { type, payload }) => {
        if (payload && payload.modelName !== entity.modelName) {
            return state
        }
        switch (type) {
            case RESPONSE.FIND:
                return { ...state, find: payload.ids }
            case RESPONSE.FIND_BY_ID:
                return { ...state, findById: payload.id }
            case RESPONSE.CREATE:
                return { ...state, create: payload.id }
            case RESPONSE.UPDATE:
                return { ...state, update: payload.id }
            case RESPONSE.UPDATE_ALL:
                return { ...state, updateAll: payload.count }
            case RESPONSE.COUNT:
                return { ...state, count: payload.count }
            case RESPONSE.DELETE_BY_ID:
            //case RESPONSE.DELETE:
                const newState = { ...state, deleteById: payload.id }
                if(newState.findById == payload.id) newState.findById = null
                if(newState.create == payload.id) newState.create = null
                if(newState.update == payload.id) newState.update = null
                if(newState.find.indexOf(payload.id)>-1) {
                    newState.find = newState.find.filter(id => id !== payload.id)
                }
                return newState
            case RESPONSE.CUSTOM:
                return { ...state, custom: { ...state.custom, [payload.name]: payload.response } }
            default:
                return state
        }
    }

    return combineReducers({
        instances,
        last,
        request,
        error
    })
}