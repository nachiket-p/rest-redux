import { Reducer } from 'redux-testkit';
import modelReducer from '../../../../src/model/modelReducer';
import Model from '../../../../src/model'
import instances from '../../../../src/model/modelReducer'
import { REQUEST, RESPONSE, ERROR, SELECTED, RECEIVED, CLEAR } from '../../../../src/constants'
import { error } from '../../../../src/model/modelReducer'
const todoReducer = modelReducer({ modelName: 'todo' })

const DEFAULT_STATE_NO_LIST = { "error": null, "instances": {}, "request": { "loading": false }, last: { find: [], delete: [], custom: {} } }
describe('error reducer', () => {
    let model
    beforeEach(() => {
        model = new Model({ modelName: 'todos' }, { basePath: 'http://localhost:3000/api' })
    })

    it('should have initial state', () => {
        expect(todoReducer(undefined, {})).toEqual(DEFAULT_STATE_NO_LIST);
    })

    it('should return the payload as it is ', () => {
        expect(todoReducer({}, {
            type: ERROR,
            payload: {
                "error": 'something is a problem'
            }
        })
        ).toEqual({
            "error": null, "instances": {}, "last": { "custom": {}, "delete": [], "find": [] }, "request": {
                "loading":
                false
            }
        })

    })
    it('we are testing the clear function', () => {
        expect(todoReducer({}, {
            type: CLEAR,
            payload: {
            }
        })
        ).toEqual({
            "error": null, "instances": {}, "last": { "custom": {}, "delete": [], "find": [] }, "request": {
                "loading":
                false
            }
        })
    })
})
