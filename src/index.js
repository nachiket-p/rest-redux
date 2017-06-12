import React from 'react'
import thunk from 'redux-thunk'
import 'whatwg-fetch'

import lbReducer from './reducer'
import {createActions as actionCreator} from './actions'

export const reducer = lbReducer
export const createActions = actionCreator

export const connectModel = (model, filter) => (Component) =>{
  //const actions = createActions(model)
  // QUESTION:?? Get filtered action here const instances = actions.find()
  return class ModelComponent extends React.Component {
    render() {
      return <Component {...this.props} restActions={actions}/>
    }
  }
}

export const loopback = thunk
