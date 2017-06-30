import React from 'react'
import { Provider } from 'react-redux'
import 'purecss/build/pure.css'

import Footer from './todos/components/Footer'
import AddTodo from './todos/containers/AddTodo'
import VisibleTodoList from './todos/containers/VisibleTodoList'
import IncompleteTodos from './todos/containers/IncompleteTodos'
import CompletedTodos from './todos/containers/CompletedTodos'

import Login from './user/containers/Login'

export default ({ store }) => {

  const App = () => {
    return <div>
      <h3>TODOS</h3>
      <Login />
      <Footer />
      <AddTodo />
      <VisibleTodoList />
      <IncompleteTodos />
      <CompletedTodos />
    </div>
  }

  return <Provider store={store}>
    <App />
  </Provider>
}