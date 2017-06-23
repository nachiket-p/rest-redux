import React from 'react'
import PropTypes from 'prop-types'

const Todo = ({ onClick, completed, text, onDelete }) => (
  <li
    
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    <span onClick={onClick}> {text} </span> 
    <a href='javascript:;' onClick={onDelete}> x</a>
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo