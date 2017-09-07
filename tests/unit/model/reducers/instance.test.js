import { Reducer } from 'redux-testkit';
import modelReducer from '../../../../src/model/modelReducer';
import Model from '../../../../src/model'
import instances from '../../../../src/model/modelReducer'
import { REQUEST, RESPONSE, ERROR, SELECTED, RECEIVED, CLEAR } from '../../../../src/constants'
const todoReducer = modelReducer({ modelName: 'todos' })


const DEFAULT_STATE_NO_LIST = { "error": null, "instances": {}, "request": { "loading": false }, last: {  } }
describe('counter reducer', () => {
	let model
	beforeEach(() => {
		model = new Model({ modelName: 'todos' }, { basePath: 'http://localhost:3000/api' })
	})

	it('should have initial state', () => {
		expect(todoReducer(undefined, {})).toEqual(DEFAULT_STATE_NO_LIST);
	})
	it('should test instance received ', () => {
		const store = todoReducer({}, {
			type: RECEIVED,
			payload: {
				modelName: 'todos',
				instances: {
					'1': {
						name: 'todos'
					},

					'2': {
						name: 'example'
					}
				}
			}


		})
		expect(store.instances).toEqual({ 1: { "name": 'todos' }, 2: { "name": 'example' } })

	})
})