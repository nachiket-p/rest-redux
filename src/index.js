import React from 'react'
import _ from 'lodash'
import 'whatwg-fetch'

import ApiAdapter from './adapter/ApiAdapter'
import RequestAdapter from './adapter/RequestAdapter'

import _createReducer from './createReducer'
import Model from './model'
import pagingHoc from './hoc/paging'

export const DEFAULT_CONFIG = {
  models: [],
  globalOptions: {
    params: null,
    headers: null,
    body: null
  },
  rootSelector: (state) => state.rest
}


export default class Wrapper {
  config
  reducer
  middleware
  constructor(_config) {
    this.config = _.merge({}, DEFAULT_CONFIG, _config)
    const { models } = this.config
    console.log('config set: ', this.config)
    this.reducer = _createReducer(models)
    this.middleware = store => next => action => next(action)
    const apiAdapter = new ApiAdapter(this.config)
    const requestAdapter = new RequestAdapter(this.config)
    this._models = _.keyBy(_.map(models, model => new Model(model, this.config, apiAdapter, requestAdapter)), 'modelName')
  }

  get(modelName) {
    return this._models[modelName]
  }

  updateGlobal(options) {
    _.merge(this.config.globalOptions, options)
  }

  clear(dispatch) {
    _.each(this._models, model => dispatch(model.actions.clear()))
  }

  // createModelWrapper(model) {
  //   const modelWrapper =
  //    {
  //     modelName: model.modelName,
  //     actions: new ModelActions(model, this.config, this.apiAdapter),
  //     selectors: modelSelectors(model, this.config.rootSelector),
  //     createList: name => {
  //       return {
  //         name: name,
  //         actions: new ListActions()
  //       }
  //     }
  //   }
  // }
}

// See if HOC is better or this?
// export const connectModel = (model, filter) => (Component) => {
//   //const actions = createActions(model)
//   // QUESTION:?? Get filtered action here const instances = actions.find()
//   return class ModelComponent extends React.Component {
//     render() {
//       return <Component {...this.props} />
//       // restActions={actions}
//     }
//   }
// }


export const paging = pagingHoc
