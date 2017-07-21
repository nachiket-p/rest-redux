import { Reducer } from 'redux-testkit'
import {listReducer} from '../../../../src/list/listReducer'
import Model from '../../../../src/list'
import List from '../../../../src/list'
import { LIST, RESPONSE, CLEAR } from '../../../../src/constants'
const { SET_OPTIONS, PAGE, NEXT, PREV, LAST, FIRST } = LIST

const todoReducer = listReducer({ modelName: 'todos' }, { name: 'incomplete' })
const ID = 5
describe(' incomplete list reducer', () => {
	let model, list
	beforeEach(() => {
		list = new List({ name: 'incomplete' },{modelName: 'todos'},{pageSize: ID})
	})
	it('should test SET_OPTIONS action ', () => {
		
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
		expect(state.offset).toEqual(20)
	})
	it('should test response find ', () => {
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

