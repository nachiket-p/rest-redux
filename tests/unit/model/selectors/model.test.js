import modelSelectors from '../../../../src/model/modelSelectors'
import { DEFAULT_CONFIG } from '../../../../src'
import _ from 'lodash'

const API_PATH = "http://dummy.path/api"
const STATE = {
  rest: {
    todos: {
      instances: {
        '1': {
          text: 'Remember the milk',
          completed: true,
          id: 1
        },
        '2': {
          text: 'Reminder to remember the milk',
          completed: true,
          id: 2
        },
        '3': {
          text: 'Visualize milk as beer',
          completed: true,
          id: 3
        },
        '4': {
          text: 'Don\'t forget the milk at the store',
          completed: true,
          id: 4
        },
        '5': {
          text: 'adsf',
          completed: false,
          id: 5
        }
      },
      last: {
        [API_PATH]: {
          find: [
            1,
            2,
            3
          ],
          'delete': [],
          count: 3,
          custom: {}
        }
      },
      request: {
        loading: false
      },
      error: null
    },
    users: {
      instances: {},
      last: {
        find: [],
        'delete': [],
        custom: {
          LOGIN: {
            id: 'NzeiN0JOtXKmyHN2Ut2cx8CaT5J1KEREusthSu9sbfkKdsASUsnSA8RDevSoGJZo',
            ttl: 1209600,
            created: '2017-07-22T09:24:58.073Z',
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
const instances = STATE.rest.todos.instances

describe('Model Selectors ', () => {
  let selectors
  beforeEach(() => {
    selectors = modelSelectors({ modelName: 'todos' }, API_PATH, DEFAULT_CONFIG.rootSelector)
  })

  it('should be defined', () => {
    expect(selectors).toBeDefined()
  })

  it('should have following methods', () => {
    expect(selectors.getInstances).toBeDefined()
    expect(selectors.isLoading).toBeDefined()
    expect(selectors.getModelObj).toBeDefined()
    expect(selectors.getCount).toBeDefined()
    expect(selectors.getFound).toBeDefined()

  })

  it('should return ModelObject', () => {
    expect(selectors.getModelObj(STATE)).toEqual(STATE.rest.todos)
  })

  it('should return found Instances', () => {
    expect(selectors.getFound(STATE)).toEqual([instances['1'], instances['2'], instances['3']])
  })
  it('should return instances', () => {
    expect(selectors.getInstances(STATE)).toEqual(_.values(STATE.rest.todos.instances))
  })
  it('should return loading', () => {
    expect(selectors.isLoading(STATE)).toEqual(STATE.rest.todos.request.loading)
  })
  it('should return count ', () => {
    expect(selectors.getCount(STATE)).toEqual(STATE.rest.todos.last[API_PATH].count)
  })
})
