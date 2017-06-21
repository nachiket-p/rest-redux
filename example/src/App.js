import React from 'react'
import { Provider } from 'react-redux'
import TodoApp from './todos/App'
import 'purecss/build/pure.css'
import {todo} from './api'
const todoActions = todo.actions

export default ({store}) => {
  
  store.dispatch(todoActions.create({text: 'dummy'})).then((response) => {
    console.log('CREATED SUCCESSFULLY', response)
    store.dispatch(todoActions.find({}))
    store.dispatch(todoActions.count())
  }).catch(err => console.log('CREATE ERROR', err))
  store.dispatch(todoActions.update(1, {text: 'X dummy'}))
  store.dispatch(todoActions.findById(2))
  store.dispatch(todoActions.update(55, {text: 'Y dummy'}))
  

  return <Provider store={store}>
    <TodoApp />
  </Provider>
}