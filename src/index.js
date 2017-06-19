import React from 'react'
import thunk from 'redux-thunk'
import _ from 'lodash'
import 'whatwg-fetch'

import _createReducer from './createReducer'
import ModelActions from './ModelActions'


export default class Wrapper {
  config
  loopback
  constructor(_config) {
    this.config = _config
    console.log('config set: ', this.config)
    this.reducer = _createReducer(this.config.models)
    this.loopback = thunk
  }

  createActions (modelName, _config) {
    return new ModelActions(modelName, _.merge({}, this.config, _config))
  }

}

export const connectModel = (model, filter) => (Component) =>{
  //const actions = createActions(model)
  // QUESTION:?? Get filtered action here const instances = actions.find()
  return class ModelComponent extends React.Component {
    render() {
      return <Component {...this.props} /> 
      // restActions={actions}
    }
  }
}


