import { Reducer } from 'redux-testkit'
import modelReducer from '../../../../src/list/listReducer'
import Model from '../../../../src/list'
import List from '../../../../src/list'
import { LIST, RESPONSE, CLEAR } from '../../../../src/constants'
const { SET_OPTIONS, PAGE, NEXT, PREV, LAST, FIRST } = LIST

const todoReducer = modelReducer({ modelName: 'todos' }, { name: 'incomplete' })

describe(' incomplete list reducer', () => {
	let model, list
	beforeEach(() => {
		model = new Model({ modelName: 'todos' }, { basePath: 'http://localhost:3000/api' })
		list = new List({ name: 'incomplete' })
	})
	it('should test SET_OPTIONS action ', () => {
		const ID = 5
		const ACTION_CUSTOM_SET_OPTIONS = {
			type: SET_OPTIONS,
			offset: 1,
			pageSize: ID,
			total: null,
			result: [],
			headers: {},
			params: {}
		}
		const state = todoReducer({ pageSize: ID, params: { completed: false } }, ACTION_CUSTOM_SET_OPTIONS)
		expect(state.pageSize).toEqual(ID)
		expect(state.params.completed).toEqual(false)
	})
	it('should test PAGE action', () => {
		const ID = 2
		const ACTION_CUSTOM_PAGE = {
			type: PAGE,
			"payload": {
				page: 4,
				listName: 'incomplete',
				modelName: 'todos'
			}
		}
		const state = todoReducer({ pageSize: ID, params: { completed: false } }, ACTION_CUSTOM_PAGE)
		console.log(ACTION_CUSTOM_PAGE)
		expect(state.offset).toEqual(8)
	})
	it('should test response find ', () => {
		const ID = 4
		const ACTION_CUSTOM_RESPONSE_FIND = {
			type: RESPONSE.FIND,
			"payload": {
				ids: [
					3
				],
				listName: 'incomplete',
				modelName: 'todos'
			}
		}
		const state = todoReducer({ pageSize: ID, params: { completed: false } }, ACTION_CUSTOM_RESPONSE_FIND)
		expect(state.result).toEqual([3])
	})
	it('should test response count', () => {
		const ID = 4
		const ACTION_CUSTOM_RESPONSE_COUNT = {
			type: RESPONSE.COUNT,
			"payload": {
				count: ID,
				listName: 'incomplete',
				modelName: 'todos'
			}
		}
		const state = todoReducer({ pageSize: ID, params: { completed: false } },ACTION_CUSTOM_RESPONSE_COUNT)
		expect(state.total).toEqual(ID)
	})
})

