import queryString from 'query-string'
import _ from 'lodash'
import { schema, normalize } from 'normalizr';

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
    this.apiPath = 'http://localhost:3000/api/' + modelName
    this.entitySchema = new schema.Entity(modelName)
  }

  _normalize(response) {
    if (_.isArray(response)) {
      return normalize(response, [this.entitySchema])
    } else {
      return normalize(response, this.entitySchema)
    }
  }

  _error(dispatch, error) {
    error.response.json().then((response) => {
      const action = { type: ERROR, payload: { modelName: this.modelName, error: response.error, message: error.message } }
      dispatch(action)
    })
  }

  _responseHandler(dispatch, creator) {
    return (response) => {
      console.log('request succeeded with JSON response', response)
      const normalized = this._normalize(response)
      console.log('normalized: ', normalized)
      _.each(normalized.entities, (entities, name) => {
        dispatch(creator(entities, name))
      })
    }
  }

  _send(path, method, body, successCreator) {
    return dispatch => {
      fetch(path, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: body
      })
        .then(checkStatus)
        .then(parseJSON)
        .then(this._responseHandler(dispatch, successCreator))
        .catch((error) => {
          console.log('request failed', error)
          this._error(dispatch, error)
        })
    }
  }

  _get(path, params, successCreator) {
    path = `${path}?${queryString.stringify(params)}`
    return dispatch => {
      fetch(path, { method: 'GET' })
        .then(checkStatus)
        .then(parseJSON)
        .then(this._responseHandler(dispatch, successCreator))
        .catch((error) => {
          console.log('request failed', error)
          this._error(dispatch, error)
        })
    }
  }

  _genericAction(type, instances, modelName) {
    return { type, payload: { modelName, instances } }
  }

  create(data) {
    return this._send(this.apiPath, 'POST', JSON.stringify(data), (instances, name) => this._genericAction(CREATE, instances, name))
  }

  find(filter) {
    return this._get(this.apiPath, { filter: JSON.stringify(filter) }, (instances, name) => this._genericAction(FIND, instances, name))
  }

  updateAttributes(id, data) {
    return this._send(`${this.apiPath}/${id}`, 'PUT', JSON.stringify(data), (instances, name) => this._genericAction(UPDATE_ATTRIBUTES, instances, name))
  }
  findById(id, filter) {
    return this._send(`${this.apiPath}/${id}`, 'GET', { filter: JSON.stringify(filter) }, (instances, name) => this._genericAction(FIND_BY_ID, instances, name))
  }

  findOne(filter) {
    return { type: FIND_ONE, payload: { modelName: this.modelName, filter } }
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

}

export const createActions = (modelName) => new ModelActions(modelName)