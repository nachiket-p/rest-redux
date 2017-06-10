import React from 'react'
import { Provider } from 'react-redux'
import TodoApp from './todos/App'
import 'purecss/build/pure.css'
import {createActions} from 'loopback-redux'

const todoActions = createActions('Todo');

export default ({store}) => {
  store.dispatch(todoActions.create({text: 'dummy'}))

  return <Provider store={store}>
    <TodoApp />
  </Provider>
}