import React from 'react'
import thunk from 'redux-thunk'
import _ from 'lodash'
import 'whatwg-fetch'

import ApiAdapter from './ApiAdapter'
import _createReducer from './createReducer'
import ModelActions from './model/ModelActions'
import modelSelectors from './model/modelSelectors'

const DEFAULT_CONFIG = {
  models: [],
  globalOptions: {
    params: null,
    headers: null,
    body: null
  },
  rootSelector: (state) => state.loopback
}
export default class Wrapper {
  config
  loopback
  constructor(_config) {
    this.config = _.merge({}, DEFAULT_CONFIG, _config )
    const { models } = this.config
    console.log('config set: ', this.config)
    this.reducer = _createReducer(models)
    //TODO: Should I have thunk here? 
    this.middleware = thunk

    const apiAdapter = new ApiAdapter(this.config)
    this._models = _.keyBy(_.map(models, model => ({
      modelName: model.modelName,
      actions: new ModelActions(model, this.config, apiAdapter),
      selectors: modelSelectors(model, this.config.rootSelector)
    })), 'modelName')
  }

  get(modelName) {
    return this._models[modelName]
  }

  updateGlobal(options) {
    _.merge(this.config.globalOptions, options)
  }

}

export const connectModel = (model, filter) => (Component) => {
  //const actions = createActions(model)
  // QUESTION:?? Get filtered action here const instances = actions.find()
  return class ModelComponent extends React.Component {
    render() {
      return <Component {...this.props} />
      // restActions={actions}
    }
  }
}


