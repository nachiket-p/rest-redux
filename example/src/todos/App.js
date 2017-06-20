import React from 'react'
import Footer from './components/Footer'
import AddTodo from './containers/AddTodo'
import VisibleTodoList from './containers/VisibleTodoList'


export default ({}) => {
  return <div>
    <h3>TODOS</h3>
    <Footer />
    <AddTodo />
    <VisibleTodoList />
  </div>
}