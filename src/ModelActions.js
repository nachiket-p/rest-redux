import queryString from 'query-string'
import _ from 'lodash'
import { schema, normalize } from 'normalizr';
import { REQUEST, RESPONSE, ACTION, ERROR, SELECTED, RECEIVED } from './constants'

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
  constructor(model, config) {
    console.log('setting Action config: ', config)
    this.modelName = model.modelName
    this.apiPath = config.basePath + '/' + model.modelName
    this.entitySchema = new schema.Entity(model.modelName)
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
      const actionResult = creator(response)
      const actions = _.isArray(actionResult) ? actionResult : [actionResult]
      console.log('firing actions:', actions)
      actions.forEach(action => dispatch(action))
      return response
    }
  }

  _errorHandler(dispatch) {
    return (error) => {
      console.log('request failed', error)
      const dispatchError = (error, message) => dispatch({ type: ERROR, payload: { modelName: this.modelName, error, message } })
      if (error.response) {
        error.response.json().then((response) => {
          dispatchError(response.error, error.message)
        })
      } else {
        dispatchError(error, error.message)
      }
      return error
    }
  }

  _call(path, method, fetchOptions, requestCreator, successCreator) {
    return dispatch => {
      dispatch(requestCreator())
      return this._fetch(path, method, fetchOptions, this._successHandler(dispatch, successCreator), this._errorHandler(dispatch))
    }
  }

  _createAction(type, others) {
    return { type, payload: _.merge({ modelName: this.modelName }, others) }
  }

  _responseAction(type, instances, modelName) {
    return { type, payload: { modelName, instances } }
  }

  _createNormalized(type) {
    return (response) => {
      let normalized
      if (_.isArray(response)) {
        normalized = normalize(response, [this.entitySchema])
      } else {
        normalized = normalize(response, this.entitySchema)
      }
      console.log('normalized: ', normalized)

      const actions = _.map(normalized.entities, (entities, modelName) => {
        return { type: RECEIVED, payload: { modelName, instances: entities } }
      })
      actions.push(this._createAction(type, { ids: normalized.result }))
      return actions;
    }
  }

  create(data) {
    return this._call(this.apiPath, 'POST', { body: JSON.stringify(data), headers: this.headers },
      () => this._createAction(REQUEST.CREATE, { data }),
      this._createNormalized(RESPONSE.CREATE))
  }

  update(id, data) {
    return this._call(`${this.apiPath}/${id}`, 'PATCH', { body: JSON.stringify(data), headers: this.headers },
      () => this._createAction(REQUEST.UPDATE, { id, data }),
      this._createNormalized(RESPONSE.UPDATE))
  }

  updateAll(where, data) {
    const params = { where: JSON.stringify(where) }
    const body = JSON.stringify(data)
    return this._call(`${this.apiPath}/update`, 'POST', { params, body, headers: this.headers },
      () => this._createAction(REQUEST.UPDATE_ALL, { where, data }),
      (instances, name) => this._responseAction(RESPONSE.UPDATE_ALL, instances, name))
  }

  find(filter) {
    const params = { filter: JSON.stringify(filter) }
    return this._call(this.apiPath, 'GET', { params },
      () => this._createAction(REQUEST.FIND, { params }),
      this._createNormalized(RESPONSE.FIND))
  }

  findById(id, filter) {
    const params = filter?{ filter: JSON.stringify(filter) }:null
    return this._call(`${this.apiPath}/${id}`, 'GET', { params },
      () => this._createAction(REQUEST.FIND_BY_ID, { id, filter }),
      this._createNormalized(RESPONSE.FIND_BY_ID))
  }

  deleteById(id) {
    return this._call(`${this.apiPath}/${id}`, 'DELETE', {},
      () => this._createAction(REQUEST.DELETE_BY_ID, { id }),
      (response) => this._createAction(RESPONSE.DELETE_BY_ID, { ids: [id + ''] })
    )
  }

  count(filter) {
    const params = { filter: JSON.stringify(filter) }
    return this._call(`${this.apiPath}/count`, 'GET', { params },
      () => this._createAction(REQUEST.COUNT, { filter }),
      (response) => this._createAction(RESPONSE.COUNT, { count: response.count })
    )
  }

  custom(name, path, method, options = {}) {
    const _options = { headers: options.headers ? options.headers : {} }
    if (options.params) _options.params = JSON.stringify(options.params)
    if (options.body) _options.body = JSON.stringify(options.body)

    return this._call(`${this.apiPath}/${path}`, method, _options,
      () => this._createAction(REQUEST.CUSTOM, { name, path, method, options }),
      (response) => this._createAction(RESPONSE.CUSTOM, { response: response, name })
    )
  }

  findOne(filter) {
    throw new Error('not implemented yet')
    // return { type: RESPONSE.FIND_ONE, payload: { modelName: this.modelName, filter } }
  }

  delete(filter) {
    throw new Error('not implemented yet')
    // return this._delete(`${this.apiPath}`, {filter: JSON.stringify(filter)},
    //   () => this._createAction(REQUEST.DELETE, { filter }),
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
