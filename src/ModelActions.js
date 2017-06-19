import queryString from 'query-string'
import _ from 'lodash'
import { schema, normalize } from 'normalizr';
import { REQUEST, RESPONSE, ACTION, ERROR } from './constants'

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
const DEFAULT_HEADERS = {
  'Content-Type': 'application/json'
}
export default class ModelActions {
  constructor(modelName, config) {
    console.log('setting Action config: ', config)
    this.modelName = modelName
    this.apiPath = config.basePath + '/' + modelName
    this.entitySchema = new schema.Entity(modelName)
    this.headers = config.headers || DEFAULT_HEADERS
  }

  _fetch(path, method, fetchOptions, handler, errorHandler) {
    const { params } = fetchOptions
    if (params && !_.isEmpty(params)) {
      path = `${path}?${queryString.stringify(params)}`
      delete fetchOptions.params
    }
    fetchOptions.method = method
    return fetch(path, fetchOptions)
      .then(checkStatus)
      .then(parseJSON)
      .then(handler)
      .catch(errorHandler)
  }

  _successHandler(dispatch, creator) {
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

  _errorHandler(dispatch) {
    return (error) => {
      console.log('request failed', error)
      error.response.json().then((response) => {
        const action = { type: ERROR, payload: { modelName: this.modelName, error: response.error, message: error.message } }
        dispatch(action)
      })
    }
  }

  _call(path, method, fetchOptions, requestCreator, successCreator) {
    return dispatch => {
      dispatch(requestCreator())
      this._fetch(path, method, fetchOptions, this._successHandler(dispatch, successCreator), this._errorHandler(dispatch))
    }
  }

  _createAction(type, others) {
    return { type, payload: _.merge({ modelName: this.modelName }, others) }
  }

  _responseAction(type, instances, modelName) {
    return { type, payload: { modelName, instances } }
  }

  create(data) {
    return this._call(this.apiPath, 'POST', { body: JSON.stringify(data), headers: this.headers },
      () => this._createAction(REQUEST.CREATE, { data }),
      (instances, name) => this._responseAction(RESPONSE.CREATE, instances, name))
  }

  update(id, data) {
    return this._call(`${this.apiPath}/${id}`, 'PATCH', { body: JSON.stringify(data), headers: this.headers },
      () => this._createAction(REQUEST.UPDATE, { id, data }),
      (instances, name) => this._responseAction(RESPONSE.UPDATE, instances, name))
  }

  updateAll(where, data) {
    const body = { where: JSON.stringify(where) }
    return this._call(`${this.apiPath}/update`, 'POST', { body, headers: this.headers },
      () => this._createAction(REQUEST.UPDATE_ALL, { where, data }),
      (instances, name) => this._responseAction(RESPONSE.UPDATE_ALL, instances, name))
  }

  find(filter) {
    const params = { filter: JSON.stringify(filter) }
    return this._call(this.apiPath, 'GET' , {params} ,
      () => this._createAction(REQUEST.FIND, { params }),
      (instances, name) => this._responseAction(RESPONSE.FIND, instances, name))
  }

  findById(id, filter) {
    const params = { filter: JSON.stringify(filter) }
    return this._call(`${this.apiPath}/${id}`, 'GET', { params },
      () => this._createAction(REQUEST.FIND_BY_ID, { id, filter }),
      (instances, name) => this._responseAction(RESPONSE.FIND_BY_ID, instances, name))
  }

  delete(id) {
    return this._call(`${this.apiPath}/${id}`, 'DELETE' , {},
      () => this._createAction(REQUEST.DELETE, { id }),
      (response) => this._createAction(RESPONSE.DELETE, { ids: [id + ''] })
    )
  }

  findOne(filter) {
    throw new Error('not implemented yet')
    // return { type: RESPONSE.FIND_ONE, payload: { modelName: this.modelName, filter } }
  }

  count(filter) {
    throw new Error('not implemented yet')

    // const params = { filter: JSON.stringify(filter) }
    // return this._call(`${this.apiPath}/count`, 'GET', { params },
    //   () => this._createAction(REQUEST.COUNT, { filter }),
    //   (response) => _createPayload(RESPONSE.COUNT, { count: count })
    // )
  }

  deleteAll(filter) {
    throw new Error('not implemented yet')
    // return this._delete(`${this.apiPath}`, {filter: JSON.stringify(filter)},
    //   () => this._createAction(REQUEST.DELETE_ALL, { filter }),
    //   (response) => _createPayload(RESPONSE.DELETE, { ids: response.ids })
    // )
  }
  
  exists(id) {
    throw new Error('not implemented yet')
    // return this._get(`${this.apiPath}/${id}`, { filter: JSON.stringify(filter) },
    //   () => this._createAction(REQUEST.EXISTS, { id, filter }),
    //   (instances, name) => this._responseAction(RESPONSE.EXISTS, instances, name))
  }
}
