import listSelectors from '../../../../src/list/listSelectors'
import modelSelectors from '../../../../src/model/modelSelectors'
import { DEFAULT_CONFIG } from '../../../../src'
import _ from 'lodash'
const STATE = {
	rest: {
		todos: {
			instances: {
				'1': { name: 'todos' },
				'2': { name: 'users' }
			},
			last: {
				find: [],
				'delete': [],
				custom: {}
			},
			request: {
				loading: true
			},
			error: null,
			lists: {
				personal: {
					offset: 0,
					pageSize: 5,
					total: null,
					result: [],
					headers: {},
					params: {}
				},
				incomplete: {
					offset: 0,
					pageSize: 3,
					total: null,
					result: [],
					headers: {},
					params: {
						completed: false
					}
				},
				completed: {
					offset: 10,
					pageSize: 2,
					total: 15,
					result: [1, 2],
					headers: {},
					params: {
						completed: true
					}
				}
			}
		},
		users: {
			instances: {},
			last: {
				find: [],
				'delete': [],
				custom: {
					LOGIN: {
						id: 'D1GfnWmU2pcrD46IpXlG1fBGtyH31Rhjxh81O31Dhcgm1CUGUFlCpwiXBj0fK3qU',
						ttl: 1209600,
						created: '2017-07-22T11:53:55.428Z',
						userId: 1
					}
				}
			},
			request: {
				loading: false
			},
			error: null
		}
	}
}

const modelSelector = modelSelectors({ modelName: 'todos' }, {}, DEFAULT_CONFIG.rootSelector)
describe('List Selector', () => {
	let selectors
	beforeEach(() => {
		selectors = listSelectors('completed', modelSelector)
	})
	it('should return list Obj', () => {
		expect(selectors.getListObj(STATE)).toEqual(modelSelector.getModelObj(STATE).lists['completed'])
	})
	it('should return total', () => {
		expect(selectors.getTotal(STATE)).toEqual(selectors.getListObj(STATE).total)
	})
	it('should return instaces', () => {
		const instances = STATE.rest.todos.instances
		expect(selectors.getInstances(STATE)).toEqual([instances['1'], instances['2']])
	})
	it('should return get curent page', () => {
		const listObj = selectors.getListObj(STATE)
		expect(selectors.getCurrentPage(STATE)).toEqual(listObj.offset / listObj.pageSize)
	})
	it('should return get pages ', () => {
		const listObj = selectors.getListObj(STATE)
		const pages = Math.ceil(listObj.total / listObj.pageSize)
		expect(selectors.getPages(STATE)).toEqual([...Array(pages)].map((_, i) => i++))
})
	it('should return has Next', () => {
		const listObj = selectors.getListObj(STATE)
		expect(selectors.hasNext(STATE)).toEqual(listObj.offset + listObj.pageSize < listObj.total)
	})
	it('should return has prev', () => {
		expect(selectors.hasPrev(STATE)).toEqual(selectors.getListObj(STATE).offset > 0)
	})
})

