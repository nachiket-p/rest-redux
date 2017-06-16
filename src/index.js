import React from 'react'
import thunk from 'redux-thunk'
import _ from 'lodash'
import 'whatwg-fetch'

import _createReducer from './createReducer'
import {ModelActions} from './actions'

//fixme
let _config = {
  basePath: 'http://localhost:3000/api'
}
export const configure = (config) => {
  _.merge(_config, config)
  console.log('setting config: ', _config)
}
export const createActions = (modelName, config) => new ModelActions(modelName, _.merge({}, _config, config))
export const createReducer = _createReducer

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

export const loopback = thunk
