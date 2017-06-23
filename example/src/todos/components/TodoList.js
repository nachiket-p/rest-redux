import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'

const TodoList = ({ todos, todosCount, loading, onTodoClick, deleteTodo }) => {
  const loadingEl = loading ? <span>Loading ... </span> : null
  return (
    <div>
      <ol>
        {todos.map(todo =>
          <Todo
            key={todo.id}
            {...todo}
            onClick={() => onTodoClick(todo)}
            onDelete={() => deleteTodo(todo)}
          />
        )}
      </ol>
      {loadingEl}
      <p>Total: {todosCount} </p>
    </div>
  )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired
}

export default TodoList