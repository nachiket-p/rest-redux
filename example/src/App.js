import React from 'react'
import { Provider } from 'react-redux'
import TodoApp from './todos/App'
import 'purecss/build/pure.css'
import {todoActions} from './api'

export default ({store}) => {
  store.dispatch(todoActions.find({}))
  store.dispatch(todoActions.create({text: 'dummy'})).then((response) => {
    console.log('CREATED SUCCESSFULLY', response)
    store.dispatch(todoActions.count())
  }).catch(err => console.log('CREATE ERROR', err))
  store.dispatch(todoActions.update(55, {text: 'X dummy'}))
  store.dispatch(todoActions.findById(1))
  store.dispatch(todoActions.count())

  return <Provider store={store}>
    <TodoApp />
  </Provider>
}