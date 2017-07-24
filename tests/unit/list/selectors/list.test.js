import listSelectors from '../../../../src/list/listSelectors'
import modelSelectors from '../../../../src/model/modelSelectors'
import { DEFAULT_CONFIG } from '../../../../src'
import _ from 'lodash'
const STATE_FIRST_PAGE = {
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
				completed: {
					offset: 0,
					pageSize: 3,
					total: 7,
					result: [1, 2],
					headers: {},
					params: {
						completed: true
					}
				}
			}
		}
	}
}

const STATE_SECOND_PAGE =  {
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
				completed: {
					offset: 1,
					pageSize: 3,
					total: 7,
					result: [1, 2],
					headers: {},
					params: {
						completed: true
					}
				}
			}
		}
	}
}

const STATE_THIRD_PAGE =  {
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
				completed: {
					offset: 2,
					pageSize: 3,
					total: 7,
					result: [1, 2],
					headers: {},
					params: {
						completed: true
					}
				}
			}
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
		expect(selectors.getListObj(STATE_FIRST_PAGE)).toEqual(modelSelector.getModelObj(STATE_FIRST_PAGE).lists['completed'])
	})
	it('should return total', () => {
		expect(selectors.getTotal(STATE_FIRST_PAGE)).toEqual(selectors.getListObj(STATE_FIRST_PAGE).total)
	})
	it('should return instaces', () => {
		const instances = STATE_FIRST_PAGE.rest.todos.instances
		expect(selectors.getInstances(STATE_FIRST_PAGE)).toEqual([instances['1'], instances['2']])
	})
	it('should return get curent page', () => {
		const listObj = selectors.getListObj(STATE_FIRST_PAGE)
		expect(selectors.getCurrentPage(STATE_FIRST_PAGE)).toEqual(listObj.offset / listObj.pageSize)
	})
	it('should return get pages ', () => {
		const listObj = selectors.getListObj(STATE_FIRST_PAGE)
		const pages = Math.ceil(listObj.total / listObj.pageSize)
		expect(selectors.getPages(STATE_FIRST_PAGE)).toEqual([...Array(pages)].map((_, i) => i++))
	})
	it('should return has Next', () => {
		const listObj = selectors.getListObj(STATE_FIRST_PAGE)
		expect(selectors.hasNext(STATE_FIRST_PAGE)).toEqual(true)
		expect(selectors.hasNext(STATE_SECOND_PAGE)).toEqual(true)
		expect(selectors.hasNext(STATE_THIRD_PAGE)).toEqual(true)
	})
	it('should return has prev', () => {
		expect(selectors.hasPrev(STATE_FIRST_PAGE)).toEqual(false)
		expect(selectors.hasPrev(STATE_SECOND_PAGE)).toEqual(true)
		expect(selectors.hasPrev(STATE_THIRD_PAGE)).toEqual(true)
	})
})

