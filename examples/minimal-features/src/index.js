import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import RestRedux from 'rest-redux';
import { connect } from 'react-redux'
import thunk from 'redux-thunk';

// There are more options, which are important, e.g. schema & lists for models.
const restRedux = new RestRedux({
  basePath: 'http://localhost:3000/api',
  globalOptions: {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  models: [
    { modelName: 'todos', apiPath: '/todos' }, 
    { modelName: 'todoComments', apiPath: '/todos/{id}/comments' }, 
    { modelName: 'users' }, 
    { modelName: 'comments'}
  ]
})

let reducer = combineReducers({
  rest: restRedux.reducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(
    thunk,
    restRedux.middleware
  ))
)
const todos = restRedux.get('todos')
const todoComments = restRedux.get('todoComments')
const users = restRedux.get('users')



//Stateless View Component
const ListComponent = ({ todos, todo1Comments, todo2Comments }) => <div>
  <h3>Todos</h3>
  <ul>
    {todos.map(todo => <li key={todo.id} style={{
      textDecoration: todo.completed ? 'line-through' : 'none'
    }}>{todo.text}</li>)}
  </ul>

  <h4>Comments of a First Todo</h4>
  <ul>
    {todo1Comments.map(comment => <li key={comment.id}>{comment.text}</li>)}
  </ul>

  <h4>Comments of a Second Todo</h4>
  <ul>
    {todo2Comments.map(comment => <li key={comment.id}>{comment.text}</li>)}
  </ul>
</div>

const FIRST_TODO_ID = 1;
const SECOND_TODO_ID = 2;

//Redux Connect
const App = connect((state) => ({
  todos: todos.selectors().getFound(state),
  todo1Comments: todoComments.selectors({id: FIRST_TODO_ID}).getFound(state), 
  todo2Comments: todoComments.selectors({id: SECOND_TODO_ID}).getFound(state), 
}), null)(ListComponent)

//RENDER APP
ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)

//Dispatch Custom Login Action on Users
const options = { body: { email: 'john@doe.com', password: 'gotthemilk' } }
store.dispatch(users.actions().custom('LOGIN', 'login', 'POST', options))
  .then(response => {
    console.log('LOGIN SUCCESS', response)
    //Apply Headers with rest-redux 
    restRedux.updateGlobal({
      headers: {
        'Authorization': response.id
      }
    })
    //Dispatch Fetch Action
    store.dispatch(todos.actions().find({}))
    //Returns todos of URL with TODO_ID
    store.dispatch(todoComments.actions({id: FIRST_TODO_ID}).find({}))
    store.dispatch(todoComments.actions({id: SECOND_TODO_ID}).find({}))
  })
