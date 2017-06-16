import queryString from 'query-string'
import _ from 'lodash'
import { schema, normalize } from 'normalizr';
import {REQUEST, RESPONSE, ACTION, ERROR} from './constants'

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
  return response.json()
}

export const ModelActions = class {
  constructor(modelName, config) {
    console.log('setting Action config: ',config)
    this.modelName = modelName
    this.apiPath =  config.basePath + '/' + modelName
    this.entitySchema = new schema.Entity(modelName)
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
      let normalized
      if (_.isArray(response)) {
        normalized = normalize(response, [this.entitySchema])
      } else {
        normalized = normalize(response, this.entitySchema)
      }
      console.log('normalized: ', normalized)
      _.each(normalized.entities, (entities, name) => {
        dispatch(creator(entities, name))
      })
    }
  }

  _send(path, method, body, requestCreator, successCreator) {
    return dispatch => {
      dispatch(requestCreator())
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

  _get(path, params, requestCreator, successCreator) {
    path = `${path}?${queryString.stringify(params)}`
    return dispatch => {
      dispatch(requestCreator())
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

  _delete(path, params, requestCreator, successCreator) {
    path = `${path}?${queryString.stringify(params)}`
    return dispatch => {
      dispatch(requestCreator())
      fetch(path, { method: 'DELETE' })
        .then(checkStatus)
        .then(parseJSON)
        .then((response) => {
            dispatch(successCreator())
        })
        .catch((error) => {
          console.log('request failed', error)
          this._error(dispatch, error)
        })
    }
  }

  _requestAction(type, others) {
    return { type, payload: _.merge({ modelName: this.modelName}, others) } 
  }

  _responseAction(type, instances, modelName) {
    return { type, payload: { modelName, instances } }
  }

  create(data) {
    return this._send(this.apiPath, 'POST', JSON.stringify(data), 
      () => this._requestAction(REQUEST.CREATE, {data}),
      (instances, name) => this._responseAction(RESPONSE.CREATE, instances, name))
  }

  find(filter) {
    return this._get(this.apiPath, { filter: JSON.stringify(filter) }, 
      () => this._requestAction(REQUEST.FIND, {filter}),
      (instances, name) => this._responseAction(RESPONSE.FIND, instances, name))
  }

  update(id, data) {
    return this._send(`${this.apiPath}/${id}`, 'PATCH', JSON.stringify(data), 
      () => this._requestAction(REQUEST.UPDATE, {id, data}),
      (instances, name) => this._responseAction(RESPONSE.UPDATE, instances, name))
  }
  findById(id, filter) {
    return this._send(`${this.apiPath}/${id}`, 'GET', { filter: JSON.stringify(filter) }, 
      () => this._requestAction(REQUEST.FIND_BY_ID, {id, filter}),
      (instances, name) => this._responseAction(RESPONSE.FIND_BY_ID, instances, name))
  }

  findOne(filter) {
    return { type: RESPONSE.FIND_ONE, payload: { modelName: this.modelName, filter } }
  }

  delete(id) {
    return this._delete(`${this.apiPath}/${id}`, {}, 
      () => this._requestAction(REQUEST.DELETE, {id}),
      () => ({ type : RESPONSE.DELETE, payload : { modelName: this.modelName, ids: [id+''] } }))
  }
  deleteAll(filter) {
    return { type: RESPONSE.DESTROY_BY_ID, payload: { modelName: this.modelName, id } }
  }
  count(filter) {
    return { type: RESPONSE.COUNT, payload: { modelName: this.modelName, filter } }
  }
  exists(filter) {
    return { type: RESPONSE.EXISTS, payload: { modelName: this.modelName, exists } }
  }
  updateAll(filter, data) {
    return { type: RESPONSE.UPDATE_ALL, payload: { modelName: this.modelName, filter, data } }
  }

}
