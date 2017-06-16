import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import {createActions} from 'loopback-redux'
const todoActions = createActions('todos');

let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(todoActions.create({text:input.value}))
        input.value = ''
      }}>
        <input ref={node => {
          input = node
        }} />
        <button type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo