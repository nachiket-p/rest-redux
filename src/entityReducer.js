import { schema, normalize } from 'normalizr'
import {combineReducers} from 'redux'
import _ from 'lodash'
import { REQUEST, RESPONSE, ERROR } from './constants'

export default (entity) => {
    const instances = (state = {}, { type, payload }) => {
        if(payload && payload.modelName !== entity.modelName) {
            return state
        }
        switch (type) {
            case RESPONSE.FIND:
            case RESPONSE.FIND_BY_ID:
            case RESPONSE.CREATE:
            case RESPONSE.UPDATE:
                return  _.merge({}, state, payload.instances)
            default:
                return state    
        }
    }

    const error = (state = null, { type, payload }) => {
        if(payload && payload.modelName !== entity.modelName) {
            return state
        }
        switch (type) {
            case ERROR:
                return payload
            default:
                return state
        }
    }

    const DEFAULT_REQUEST= {loading: false}
    const request = (state = DEFAULT_REQUEST, { type, payload }) => {
        if(payload && payload.modelName !== entity.modelName) {
            return state
        }
        switch (type) {
            case REQUEST.FIND:
            case REQUEST.FIND_BY_ID:
            case REQUEST.CREATE:
            case REQUEST.UPDATE:
                return _.merge({}, state, {loading: true})
            case RESPONSE.FIND:
            case RESPONSE.FIND_BY_ID:
            case RESPONSE.CREATE:
            case RESPONSE.UPDATE:
            case ERROR:
                return _.merge({}, state, {loading: false})
            default:
                return state
        }
    }

    return combineReducers({
        instances,
        request,
        error
    })
}