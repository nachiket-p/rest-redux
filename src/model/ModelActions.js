import _ from 'lodash'
import { schema, normalize } from 'normalizr';
import { REQUEST, RESPONSE, ACTION, ERROR, SELECTED, RECEIVED, CLEAR } from '../constants'

//TODO: Move URL related logic to APIAdapter
export default class ModelActions {
  constructor(model, config, apiPath, api, requestAdapter) {
    this.model = model
    this.entitySchema = new schema.Entity(model.modelName)
    this.apiPath = apiPath
    this.api = api
    this.requestAdapter = requestAdapter
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
      const dispatchError = (error, message) => dispatch({ type: ERROR, payload: { modelName: this.model.modelName, error, message } })
      if (error.response) {
        error.response.json().then((response) => {
          dispatchError(response.error, error.message)
        })
      } else {
        dispatchError(error, error.message)
      }
      throw error
      //return error
    }
  }

  _call(path, method, fetchOptions, requestCreator, successCreator) {
    return dispatch => {
      dispatch(requestCreator())
      return this.api.fetch(path, method, fetchOptions, this._successHandler(dispatch, successCreator), this._errorHandler(dispatch))
    }
  }

  _createAction(type, others) {
    return { type, payload: { ...others, modelName: this.model.modelName, apiPath: this.apiPath } }
  }

  _createNormalized(type, singleInstance = false, listName = undefined) {
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
      actions.push(this._createAction(type, { [singleInstance ? 'id' : 'ids']: normalized.result, listName }))
      return actions;
    }
  }
  
  create(data) {
    const {url, method, options} = this.requestAdapter.create(data, { apiPath: this.apiPath })
    return this._call(url, method, options,
      () => this._createAction(REQUEST.CREATE, { data }),
      this._createNormalized(RESPONSE.CREATE, true))
  }

  update(id, data) {
    const {url, method, options} = this.requestAdapter.update(id, data, { apiPath: this.apiPath })

    return this._call(url, method, options,
      () => this._createAction(REQUEST.UPDATE, { id, data }),
      this._createNormalized(RESPONSE.UPDATE, true))
  }

  updateAll(where, data) {
    const {url, method, options} = this.requestAdapter.updateAll(where, data, { apiPath: this.apiPath })

    return this._call(url, method, options,
      () => this._createAction(REQUEST.UPDATE_ALL, { where, data }),
      (response) => this._createAction(RESPONSE.UPDATE_ALL, { count: response.count }))
  }

  find(filter, listName = undefined) {
    console.log('using apiPath', this.apiPath)
    const {url, method, options} = this.requestAdapter.find(filter, { apiPath: this.apiPath })
    return this._call(url, method, options,
      () => this._createAction(REQUEST.FIND, { filter, listName }),
      this._createNormalized(RESPONSE.FIND, false, listName))
  }

  findById(id, filter) {
    const {url, method, options} = this.requestAdapter.findById(id, filter, { apiPath: this.apiPath })
    return this._call(url, method, options,
      () => this._createAction(REQUEST.FIND_BY_ID, { id, filter }),
      this._createNormalized(RESPONSE.FIND_BY_ID, true))
  }

  deleteById(id) {
    const {url, method, options} = this.requestAdapter.deleteById(id, { apiPath: this.apiPath })
    return this._call(url, method, options,
      () => this._createAction(REQUEST.DELETE_BY_ID, { id }),
      (response) => this._createAction(RESPONSE.DELETE_BY_ID, { id: id })
    )
  }

  count(where, listName=null) {
    const {url, method, options} = this.requestAdapter.count(where, { apiPath: this.apiPath })
    return this._call(url, method, options,
      () => this._createAction(REQUEST.COUNT, { where, listName }),
      (response) => this._createAction(RESPONSE.COUNT, { count: response.count, listName })
    )
  }

  custom(name, path, _method, _options = {}) {
    const {url, method, options} = this.requestAdapter.custom(name, path, _method, _options, { apiPath: this.apiPath })
    return this._call(url, method, options,
      () => this._createAction(REQUEST.CUSTOM, { name, path, _method, _options }),
      (response) => this._createAction(RESPONSE.CUSTOM, { response: response, name })
    )
  }

  clear() {
    return this._createAction(CLEAR, { })
  }

  delete(filter) {
    throw new Error('not implemented yet')
    // return this._delete(`${this.apiPath}`, {filter: JSON.stringify(filter)},
    //   () => this._createAction(REQUEST.DELETE, { filter }),
    //   (response) => _createPayload(RESPONSE.DELETE, { ids: response.ids })
    // )
  }

}
