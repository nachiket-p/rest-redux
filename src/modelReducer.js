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
                return _.merge({}, state, payload.instances)
            case RESPONSE.DELETE_BY_ID:
            case RESPONSE.DELETE:
                const newState = _.merge({}, state)
                return _.pick(newState, _.difference(_.keys(newState), payload.ids))
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
                return _.merge({}, state, { loading: true })
            case RESPONSE.FIND:
            case RESPONSE.FIND_BY_ID:
            case RESPONSE.CREATE:
            case RESPONSE.UPDATE:
            case RESPONSE.DELETE_BY_ID:
            case RESPONSE.DELETE:
            case RESPONSE.CUSTOM:
            case ERROR:
                return _.merge({}, state, { loading: false })
            default:
                return state
        }
    }

    const last = (state = { custom: {}}, { type, payload }) => {
        if (payload && payload.modelName !== entity.modelName) {
            return state
        }
        switch (type) {
            case RESPONSE.FIND:
                return _.merge({}, state, { find: payload.ids })
            case RESPONSE.FIND_BY_ID:
                return _.merge({}, state, { findById: payload.ids })
            case RESPONSE.CREATE:
                return _.merge({}, state, { created: payload.ids })
            case RESPONSE.UPDATE:
                return _.merge({}, state, { updated: payload.ids })
            case RESPONSE.COUNT:
                return _.merge({}, state, { count: payload.count })
            case RESPONSE.DELETE_BY_ID:
            case RESPONSE.DELETE:
                return _.merge({}, state, { deleted: payload.ids })
            case RESPONSE.CUSTOM:
                return _.merge({}, state, { custom: _.merge({}, state.custom, { [payload.name]: payload.response})})
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