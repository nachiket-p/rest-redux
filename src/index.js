import React from 'react'
import lbReducer from './reducer'
import {createActions as actionCreator} from './actions'

export const reducer = lbReducer
export const createActions = actionCreator

export const connectModel = (model) => (Component) =>{
  return Component
  // class ModelComponent extends React.Component {
  //   render() {
  //     return <Component {...this.props}/>
  //   }
  // }
}