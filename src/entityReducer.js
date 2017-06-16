import { schema, normalize } from 'normalizr';
import _ from 'lodash'
import { Methods, ERROR } from './actions'
const { FIND, CREATE, UPDATE_ATTRIBUTES } = Methods

const DEFAULT_STATE = {}

export default (entity) => {
    // const entitySchema = new schema.Entity(entity.modelName)
    // const getNormalized = (payload) => {
    //     console.log('getting normalized: ', payload)
    //     if (payload.instances) {
    //         return normalize(payload.instances, [entitySchema])
    //     } else {
    //         return normalize(payload.instance, entitySchema)
    //     }
    // }
    const reducer = (state = DEFAULT_STATE, action) => {
        const { type, payload } = action
        if(payload && payload.modelName !== entity.modelName) {
            return state
        }
        let normalizedData = null

        switch (type) {
            case FIND:
            case CREATE:
            case UPDATE_ATTRIBUTES:
                //normalizedData = getNormalized(payload)
                //console.log('normalized data', normalizedData)
                return _.merge({}, state, payload.instances)
            case ERROR:
                debugger
                return _.merge({}, state, {error: payload})
            default:
                return state
        }
    }
    return reducer
}