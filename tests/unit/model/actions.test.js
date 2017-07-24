import thunk from 'redux-thunk'
import _ from 'lodash'
import configureStore from 'redux-mock-store'
//import nock from 'nock'

import RestRedux from '../../../src'
import Model from '../../../src/model'
import { REQUEST, RESPONSE, CLEAR, RECEIVED } from '../../../src/constants'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const DEFAULT_STATE = { rest: { todos: { "error": null, "instances": {}, "request": { "loading": false }, last: { find: [], delete: [], custom: {} } } } }
const BASE_PATH = 'http://localhost:3000/api'

const mockResponse = (status, statusText, response) => {
  return new window.Response(JSON.stringify(response), {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

describe('ModelActions', () => {
  let model
  beforeEach(() => {
    const restRedux = new RestRedux({
      basePath: BASE_PATH,
      models: [{ modelName: 'todos', apiPath: '/todos' }]
    })
    model = restRedux.get('todos')
  })

  afterEach(() => {
    //nock.cleanAll()
  })

  it('should create a ModelActions', () => {
    const todoActions = model.actions()
    expect(todoActions).toBeDefined()
    expect(todoActions.create).toBeDefined()
    expect(todoActions.find).toBeDefined()
    expect(todoActions.findById).toBeDefined()
    expect(todoActions.update).toBeDefined()
    expect(todoActions.updateAll).toBeDefined()
    expect(todoActions.deleteById).toBeDefined()
    expect(todoActions.delete).toBeDefined()
    expect(todoActions.count).toBeDefined()
    expect(todoActions.custom).toBeDefined()
  })

  it('should return instances of Model (find)', () => {
    const response = [{ "text": "Remember the milk", "completed": false, "id": 1 }, { "text": "Reminder to remember the milk", "completed": false, "id": 2 }]
    // nock(BASE_PATH)
    //   .log((msg) => console.log("##NOCK@@ " + msg))
    //   .get('/todos').query(true)
    //   .reply(200, response)
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, response)));

    const todoActions = model.actions()
    const store = mockStore(DEFAULT_STATE)

    const expectedActions = [
      { type: REQUEST.FIND, payload: { modelName: "todos", filter: {} } },
      { type: RECEIVED, payload: { modelName: "todos", instances: _.keyBy(response, 'id') } },
      { type: RESPONSE.FIND, payload: { modelName: "todos", ids: response.map(todo => todo.id) } },
    ]

    return store.dispatch(todoActions.find({})).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should create instances of Model', () => {
    const NEW_TODO = { text: 'new todo', 'completed': false }
    const NEW_ID = 2
    const response = { ...NEW_TODO, "id": NEW_ID }
    // nock(BASE_PATH)
    //   .log((msg) => console.log("##NOCK@@ " + msg))
    //   .post('/todos').query(true)
    //   .reply(200, response)
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, response)));


    const todoActions = model.actions()
    const store = mockStore(DEFAULT_STATE)

    const expectedActions = [
      { type: REQUEST.CREATE, payload: { modelName: "todos", data: NEW_TODO } },
      { type: RECEIVED, payload: { modelName: "todos", instances: { [NEW_ID]: response } } },
      { type: RESPONSE.CREATE, payload: { modelName: "todos", id: NEW_ID } },
    ]

    return store.dispatch(todoActions.create(NEW_TODO)).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
