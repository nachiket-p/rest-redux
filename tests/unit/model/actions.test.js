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


  it('should update an instance of model ', () => {
    const UPDATE_TODO = [{ text: "ok", "completed": true, id: 1 }]
    const ID = 1
    const response = { ...UPDATE_TODO, "id": ID }

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, response)));

    const updateActions = model.actions()
    const store = mockStore(DEFAULT_STATE)
    const expectedActions = [
      { type: REQUEST.UPDATE, payload: { data: UPDATE_TODO, modelName: 'todos', id: ID } },
      { type: RECEIVED, payload: { modelName: "todos", instances: { [ID]: response } } },
      { type: RESPONSE.UPDATE, payload: { modelName: "todos", id: ID } }
    ]
    return store.dispatch(updateActions.update(ID, UPDATE_TODO)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should update all instances of model ', () => {
    const UPDATE_WHERE = { text: "ok", "completed": false, id: 1 }
    const UPDATE_DATA = { "completed": true }
    const UPDATE_VALUE = true
    const response = { ...UPDATE_WHERE, "completed": UPDATE_VALUE }
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, response)));

    const updateActions = model.actions()
    const store = mockStore(DEFAULT_STATE)

    const expectedActions = [
      { type: REQUEST.UPDATE_ALL, payload: { where: UPDATE_WHERE, data: UPDATE_DATA, modelName: 'todos' } },
      { type: RESPONSE.UPDATE_ALL, payload: { count: undefined, modelName: 'todos' } }
    ]
    return store.dispatch(updateActions.updateAll(UPDATE_WHERE, UPDATE_DATA)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should delete an instance by ID', () => {
    const COUNT = 3
    const ID = { 'count': COUNT }
    const response = { ...ID }
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, response)));

    const deleteActions = model.actions()
    const store = mockStore(DEFAULT_STATE)

    const expectedActions = [
      { type: REQUEST.DELETE_BY_ID, payload: { 'id': COUNT, modelName: 'todos' } },
      { type: RESPONSE.DELETE_BY_ID, payload: { 'id': COUNT, modelName: 'todos' } }
    ]
    return store.dispatch(deleteActions.deleteById(COUNT)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should return count of instance', () => {
    const WHERE = { "completed": false }
    const LISTNAME = null
    const response = { count: 3 }

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, response)));

    const countActions = model.actions()
    const store = mockStore(DEFAULT_STATE)

    const expectedActions = [
      { type: REQUEST.COUNT, payload: { 'where': WHERE, 'listName': LISTNAME, modelName: 'todos' } },
      { type: RESPONSE.COUNT, payload: { 'count': response.count, 'listName': LISTNAME, modelName: 'todos' } }
    ]
    return store.dispatch(countActions.count(WHERE, LISTNAME)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
  it('should return coustom action for instance', () => {
    const NAME = { name: 'LOGIN' }
    const PATH = { path: "login" }
    const METHOD = { method: 'POST' }
    const OPTION = { body: { email: 'john@doe.com', password: 'gotthemilk' } }
    const response = { ...NAME, ...PATH, ...METHOD, ...OPTION }

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, response)));

    const customAction = model.actions()
    const store = mockStore(DEFAULT_STATE)

    const expectedActions = [
      { type: REQUEST.CUSTOM, payload: { name: NAME, path: PATH, _method: METHOD, _options: OPTION, modelName: 'todos' } },
      { type: RESPONSE.CUSTOM, payload: { 'response': response, name: NAME, modelName: 'todos' } }
    ]
    return store.dispatch(customAction.custom(NAME, PATH, METHOD, OPTION)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
  it('should return instance of model (findById)', () => {
    const ID = 1
    const response = [{ "text": "Remember the milk", "completed": false, "id": 1 }]

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, response)));

    const FindByIdActions = model.actions()
    const store = mockStore(DEFAULT_STATE)
    const expectedActions = [
      { type: REQUEST.FIND_BY_ID, payload: { id: ID , modelName:'todos'} },
      { type: RECEIVED, payload: { modelName: 'todos', instances: _.keyBy(response, 'id') } },
      { type: RESPONSE.FIND_BY_ID, payload: { id: response.map(todo => ID) , modelName:'todos'} }
    ]
    return store.dispatch(FindByIdActions.findById(ID)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})
