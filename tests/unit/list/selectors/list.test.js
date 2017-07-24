import listSelectors from '../../../../src/list/listSelectors'
import modelSelectors from '../../../../src/model/modelSelectors'
import { DEFAULT_CONFIG } from '../../../../src'
import _ from 'lodash'
const data = {
	'1': {
					text: 'Remember the milk',
					completed: false,
					id: 1
				},
				'2': {
					text: 'Reminder to remember the milk',
					completed: false,
					id: 2
				},
				'3': {
					text: 'Visualize milk as beer',
					completed: false,
					id: 3
				},
				'4': {
					text: 'Don\'t forget the milk at the store',
					completed: false,
					id: 4
				},
				'5': {
					text: 'fifth',
					completed: false,
					id: 5
				},
				'6': {
					text: 'sixth',
					completed: false,
					id: 6
				},
				'7': {
					text: 'seventh',
					completed: false,
					id: 7
				}
}
const STATE_FIRST_PAGE = {
	rest: {
		todos: {
			instances: {
				data
			},
			last: {
				find: [
					1,
					2,
					3,
					4,
					5,
					6,
					7
				],
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
					result: [1, 2, 3],
					headers: {},
					params: {
						completed: true
					}
				}
			}
		}
	}
}

const STATE_MIDDLE_PAGE = {
	rest: {
		todos: {
			instances: {
			data
			},
			last: {
				find: [
					1,
					2,
					3,
					4,
					5,
					6,
					7
				],
				'delete': [],
				custom: {}
			},
			request: {
				loading: true
			},
			error: null,
			lists: {
				completed: {
					offset: 3,
					pageSize: 3,
					total: 7,
					result: [4, 5, 6],
					headers: {},
					params: {
						completed: true
					}
				}
			}
		}
	}
}

const STATE_LAST_PAGE = {
	rest: {
		todos: {
			instances: {
			data
			},
			last: {
				find: [
					1,
					2,
					3,
					4,
					5,
					6,
					7
				],
				'delete': [],
				custom: {}
			},
			request: {
				loading: true
			},
			error: null,
			lists: {
				completed: {
					offset: 6,
					pageSize: 3,
					total: 7,
					result: [7],
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
		expect(selectors.getInstances(STATE_FIRST_PAGE)).toEqual([instances['1'], instances['2'], instances['3']])
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
		expect(selectors.hasNext(STATE_FIRST_PAGE)).toEqual(true)
		expect(selectors.hasNext(STATE_MIDDLE_PAGE)).toEqual(true)
		expect(selectors.hasNext(STATE_LAST_PAGE)).toEqual(false)
	})
	it('should return has prev', () => {
		expect(selectors.hasPrev(STATE_FIRST_PAGE)).toEqual(false)
		expect(selectors.hasPrev(STATE_MIDDLE_PAGE)).toEqual(true)
		expect(selectors.hasPrev(STATE_LAST_PAGE)).toEqual(true)
	})
})

