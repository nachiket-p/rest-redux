import queryString from 'query-string'

export const CREATE = 'loopback-redux/CREATE'
export const FIND_BY_ID = 'loopback-redux/FIND_BY_ID'
export const FIND = 'loopback-redux/FIND'
export const FIND_ONE = 'loopback-redux/FIND_ONE'
export const DESTROY_BY_ID = 'loopback-redux/DESTROY_BY_ID'
export const UPDATE_ATTRIBUTES = 'loopback-redux/UPDATE_ATTRIBUTES'
export const UPDATE_ALL = 'loopback-redux/UPDATE_ALL'
export const EXISTS = 'loopback-redux/EXISTS'
export const COUNT = 'loopback-redux/COUNT'
export const ERROR = 'loopback-redux/ERROR'

export const CUSTOM = 'loopback-redux/CUSTOM'
export const REPLACE_OR_CREATE = 'loopback-redux/REPLACE_OR_CREATE'
export const PATCH_OR_CREATE = 'loopback-redux/PATCH_OR_CREAT'
export const REPLACE_BY_ID = 'loopback-redux/REPLACE_BY_ID'

export const Methods = {
  CREATE, EXISTS, FIND_BY_ID, FIND, FIND_ONE, DESTROY_BY_ID, COUNT, UPDATE_ATTRIBUTES, UPDATE_ALL
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  console.log('parsing json', response)
  return response.json()
}

const ModelActions = class {
  constructor(modelName) {
    this.modelName = modelName
    this.apiPath = 'http://localhost:3000/api/'+modelName
  }

  _error(error) {
    return { type: ERROR, payload: { modelName: this.modelName, error } }
  }

  _send(path, method, body, successCreator) {
    return dispatch => {
      fetch(path, {
        method: method, 
        headers: {'Content-Type': 'application/json'}, 
        body: body
      })
      .then(checkStatus)
      .then(parseJSON)
      .then((response) => {
        console.log('request succeeded with JSON response', response)
        dispatch(successCreator(response))
      }).catch((error) => {
        console.log('request failed', error)
        dispatch(this._error(error))
      })
    }
  }

  _get(path, params, successCreator) {
    path = `${path}?${queryString.stringify(params)}`
    return dispatch => {
      fetch(path, { method: 'GET' })
      .then(checkStatus)
      .then(parseJSON)
      .then((response) => {
        console.log('request succeeded with JSON response', response)
        dispatch(successCreator(response))
      }).catch((error) => {
        console.log('request failed', error)
        dispatch(this._error(error))
      })
    }
  }


  _create(instance) {
    return { type: CREATE, payload: { modelName: this.modelName, instance } }
  }
  create(data) {
    return this._send(this.apiPath, 'POST', JSON.stringify(data), (instance) => this._create(instance))
  }

  _find(instances) {
    return { type: FIND, payload: { modelName: this.modelName, instances } }
  }
  find(filter) {
    return this._get(this.apiPath, {filter: JSON.stringify(filter)}, (instances) => this._find(instances))
  }

  findOne(filter) {
    return { type: FIND_ONE, payload: { modelName: this.modelName, filter } }
  }
  findById(id, filter) {
    return { type: FIND_BY_ID, payload: { modelName: this.modelName, id, filter } }
  }
  destroyById(id) {
    return { type: DESTROY_BY_ID, payload: { modelName: this.modelName, id } }
  }
  count(filter) {
    return { type: COUNT, payload: { modelName: this.modelName, filter } }
  }
  exists(filter) {
    return { type: EXISTS, payload: { modelName: this.modelName, exists } }
  }
  updateAll(filter, data) {
    return { type: UPDATE_ALL, payload: { modelName: this.modelName, filter, data } }
  }
  updateAttributes(id, filter) {
    return { type: UPDATE_ATTRIBUTES, payload: { modelName: this.modelName, filter } }
  }
}

export const createActions = (modelName) => new ModelActions(modelName)