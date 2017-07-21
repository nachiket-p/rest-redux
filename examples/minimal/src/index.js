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
  models: [{ modelName: 'todos', apiPath: '/mytodos' }, { modelName: 'todoComments', apiPath: '/mytodos/{id}/comments' }, { modelName: 'users' }, {
    modelName: 'comments', urlResolver: () => {

    }
  }]
})

let reducer = combineReducers({
  rest: restRedux.reducer
})

let store = createStore(
  reducer,
  applyMiddleware(
    thunk,
    restRedux.middleware
  )
)
const todos = restRedux.get('todos')
const todoComments = restRedux.get('todoComments')
const users = restRedux.get('users')

//Stateless View Component
const ListComponent = ({ todos }) => <div>
  <h3>Todos</h3>
  <ul>
    {todos.map(todo => <li key={todo.id} style={{
      textDecoration: todo.completed ? 'line-through' : 'none'
    }}>{todo.text}</li>)}
  </ul>
</div>

//Redux Connect
const App = connect((state) => ({
  todos: todos.selectors().getFound(state),
  todoComments: todoComments.selectors({id: 4}).getFound()
}), null)(ListComponent)

//RENDER APP
ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
)

//Dispatch Custom Login Action on Users
const options = { body: { email: 'john@doe.com', password: 'gotthemilk' } }
store.dispatch(users.actions.custom('LOGIN', 'login', 'POST', options))
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
    //Returns todos of URL with 4
    store.dispatch(todoComments.actions({id: 4}).find({}))
  })
