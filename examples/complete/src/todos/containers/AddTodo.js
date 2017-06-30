import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import { todo } from '../../api'

const todoActions = todo.actions
console.log( todoActions)
let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        dispatch(todoActions.create({text:input.value})).then(response => {
            dispatch(todoActions.find())
            dispatch(todoActions.count())
        })
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