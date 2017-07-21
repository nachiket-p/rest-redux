import { Reducer } from 'redux-testkit'
import {listReducer} from '../../../../src/list/listReducer'
import Model from '../../../../src/list'
import List from '../../../../src/list'
import { LIST, RESPONSE, CLEAR } from '../../../../src/constants'
const { SET_OPTIONS, PAGE, NEXT, PREV, LAST, FIRST } = LIST

const completeListReducer = listReducer({ modelName: 'todos' }, { name: 'completed' })
const errorListReducer = listReducer({modelName : 'todos'}, { name: 'incomplete' })
const errorModelReducer = listReducer({modelName : 'users'}, { name: 'completed' }) 
const ID = 4
describe(' complete list reducer', () => {
	let model, list
	beforeEach(() => {
		list = new List({ name: 'completed' }, { modelName: 'todos' },{pageSize: ID,params: {completed:true}})
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
		const state = completeListReducer({ pageSize: ID ,params : {"completed" : true}}, ACTION_CUSTOM_SET_OPTIONS)
		expect(state.pageSize).toEqual(ID)
		expect(state.params.completed).toEqual(true)
	})
	it('should test PAGE action', () => {
		const ACTION_CUSTOM_PAGE = {
			type: PAGE,
			"payload": {
				page: 4,
				listName: 'completed',
				modelName: 'todos'
			}
		}
		const state = completeListReducer({ pageSize: ID }, ACTION_CUSTOM_PAGE)
		expect(state.offset).toEqual(ID * ACTION_CUSTOM_PAGE.payload.page)
	})
	it('should test response find ', () => {
		const ACTION_CUSTOM_RESPONSE_FIND = {
			type: RESPONSE.FIND,
			"payload": {
				ids: [
					3
				],
				listName: 'completed',
				modelName: 'todos'
			}
		}
		const state = completeListReducer({ pageSize: ID }, ACTION_CUSTOM_RESPONSE_FIND)
		expect(state.result).toEqual(ACTION_CUSTOM_RESPONSE_FIND.payload.ids)
	})
	it('should test response count', () => {
		const ACTION_CUSTOM_RESPONSE_COUNT = {
			type: RESPONSE.COUNT,
			"payload": {
				count: ID,
				listName: 'completed',
				modelName: 'todos'
			}
		}
		const state = completeListReducer({ pageSize: ID },ACTION_CUSTOM_RESPONSE_COUNT)
		expect(state.total).toEqual(ID)
	})
	it('should test error list test cases', () => {
		const ACTION_CUSTOM_ERROR_PAYLOAD ={
			type: RESPONSE.FIND,
			"payload": {
				ids: [
					3
				],
				listName: 'completed',
				modelName: 'todos'
			}
		}
		
	    // Error case as model name does not matches 
		const errModelState = errorModelReducer({ pageSize: ID }, ACTION_CUSTOM_ERROR_PAYLOAD)
		expect(errModelState.result).toBeUndefined()
		// type does not match 
		expect(errModelState.total).toBeUndefined()
		expect(errModelState.offset).toBeUndefined()
		// Error case as list name does not matches 
		const errListState = errorListReducer({ pageSize: ID }, ACTION_CUSTOM_ERROR_PAYLOAD)
		expect(errListState.result).toBeUndefined()
		// type does not match 
		expect(errListState.offset).toBeUndefined()
		expect(errListState.total).toBeUndefined()


	})
})

