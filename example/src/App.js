import React from 'react'
import { Provider } from 'react-redux'
import TodoApp from './todos/App'
import 'purecss/build/pure.css'

export default ({store}) => {
  return <Provider store={store}>
    <TodoApp />
  </Provider>
}

