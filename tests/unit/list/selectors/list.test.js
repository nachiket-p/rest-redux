import listSelectors from '../../../../src/list/listSelectors'
import modelSelectors from '../../../../src/model/modelSelectors'
import { DEFAULT_CONFIG } from '../../../../src'
import _ from 'lodash'
const STATE = {
	rest: {
		todos: {
			instances: {},
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
					offset: 0,
					pageSize: 3,
					total: null,
					result: [],
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

const model = modelSelectors({ modelName: 'todos' }, {}, DEFAULT_CONFIG.rootSelector)
describe('List Selector', () => {
	let selectors
	beforeEach(() => {
		selectors = listSelectors( 'completed' , model)
	})
	it('should return list Obj', () => {
		console.log(selectors.getListObj(STATE))
		console.log(model.getModelObj(STATE).lists['completed'])
		expect(selectors.getListObj(STATE)).toEqual(model.getModelObj(STATE).lists['completed'])
	})
})

