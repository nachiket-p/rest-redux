import { Reducer } from 'redux-testkit';
import modelReducer from '../../../../src/model/modelReducer';
import Model from '../../../../src/model'
import instances from '../../../../src/model/modelReducer'
import { REQUEST, RESPONSE, ERROR, SELECTED, RECEIVED, CLEAR } from '../../../../src/constants'
const todoReducer = modelReducer({ modelName: 'todos' })

const DEFAULT_STATE_NO_LIST = { "error": null, "instances": {}, "request": { "loading": false }, last: { find: [], delete: [], custom: {} } }
describe('request reducer', () => {
	let model
	beforeEach(() => {
		model = new Model({ modelName: 'todos' }, { basePath: 'http://localhost:3000/api' })
	})

	it('should have initial state', () => {
		expect(todoReducer(undefined, {})).toEqual(DEFAULT_STATE_NO_LIST);
	})
	it('should test request create ', () => {
		const state = todoReducer({}, {
			type: REQUEST.CREATE,
			data: {
				text: 'checking working or not '
			},
			modelName: 'todos'

		})
		expect(state.request).toEqual({ "loading": true })
	})
	it('should test request custom ', () => {
		const ACTION_CUSTOM = {
			type: REQUEST.CUSTOM,
			name: 'LOGIN',
			path: 'login',
			method: 'POST',
			options: {
				body: {
					email: 'john@doe.com',
					password: 'gotthemilk'
				}
			},
			modelName: 'users'
		}
		const state = todoReducer({}, ACTION_CUSTOM)
		expect(state.request).toEqual({ "loading": true })
	})
	it('should test request find', () => {
		const state = todoReducer({}, {
			type: REQUEST.FIND,
			params: {
				filter: '{}'
			},
			modelName: 'todos'
		})
		expect(state.request).toEqual({ "loading": true })
	})
	it('should test request update_all', () => {
		const state = todoReducer({}, {
			type: REQUEST.UPDATE,
			where: {
				completed: false
			},
			data: {
				completed: true
			},
			modelName: 'todos'
		})
		expect(state.request).toEqual({ "loading": true })
	})
	it('should test request delete_by_id', () => {
		const state = todoReducer({}, {
			type: REQUEST.DELETE_BY_ID,
			id: 3,
			modelName: 'todos'
		})
		expect(state.request).toEqual({ "loading": true })

	})
	it('should test request delete', () => {
		const state = todoReducer({}, {
			type: REQUEST.DELETE,
			modelName: 'todos'
		})
		expect(state.request).toEqual({ "loading": true })
	})
	it('should test response find', () => {
		const state = todoReducer({}, {
			type: RESPONSE.FIND,
			"payload": {
				ids: [
					1,
					2,
					3,
					4
				],
				modelName: 'todos'
			}
		})
		expect(state.request).toEqual({ "loading": false })
		expect(state.last.find).toEqual([1, 2, 3, 4])
	})
	it('should test response find_by_id', () => {
		const state = todoReducer({}, {
			type: RESPONSE.FIND_BY_ID,
			"payload": {
				id: [
					1
				],
				modelName: 'todos'
			}
		})
		expect(state.request).toEqual({ "loading": false })
		expect(state.last.findById).toEqual([1])
	})
	it('should test response create', () => {
		const store = todoReducer({}, {
			type: RESPONSE.CREATE,
			"payload": {
				id: 6,
				modelName: 'todos'
			}
		})
		expect(store.request).toEqual({ "loading": false })
		expect(store.last.create).toEqual(6)
	})
	it('should test response count', () => {
		const store = todoReducer({}, {
			type: RESPONSE.COUNT,
			"payload": {
				count: 2,
				listName: null,
				modelName: 'todos'
			}
		})
		expect(store.request).toEqual({ "loading": false })
		expect(store.last.count).toEqual(2)
	})
	it('should test response delete_by_id', () => {
		const ID = 7
		const store = todoReducer({}, {
			type: RESPONSE.DELETE_BY_ID,
			"payload": {
				id: ID,
				modelName: 'todos'
			}
		})
		expect(store.request).toEqual({ "loading": false })
		expect(store.last.deleteById).toEqual(ID)
		expect(store.instances[ID]).toBeUndefined()
	})
	it('should test response delete', () => {
		const ID = 3
		const store = todoReducer({}, {
			type: RESPONSE.DELETE,
			"payload": {
				id: ID,
				modelName: 'todos'
			}
		})
		expect(store.instances[ID]).toBeUndefined()
	})
	it('should test response update ', () => {
		const store = todoReducer({}, {
			type: RESPONSE.UPDATE,
			"payload": {
				id: 3,
				data: {
					text: 'checking working or not '
				},
				modelName: 'todos'
			}
		})
		expect(store.request).toEqual({ "loading": false })
		expect(store.last.update).toEqual(3)
	})
	it('should test response update all', () => {
		const store = todoReducer({}, {
			type: RESPONSE.UPDATE_ALL,
			"payload": {
				count: 7,
				modelName: 'todos'
			}
		})
		expect(store.last.updateAll).toEqual(7)
	})
	it('should test response custom ', () => {
		const store = todoReducer({}, {
			type: RESPONSE.CUSTOM,
			"payload": {
				error: 'null pointer exception',
				name: 'LOGIN',
				path: 'login',
				method: 'POST',
				options: {
					body: {
						email: 'john@doe.com',
						password: 'gotthemilk'
					}
				}
			},
			modelName: 'users'
		})
		expect(store.last.custom).toEqual({})
	})
})
