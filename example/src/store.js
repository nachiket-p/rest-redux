import { createStore, combineReducers, applyMiddleware } from 'redux'
import todoReducer from './todos/reducer'
import {createReducer, loopback as loopbackMiddleware} from 'loopback-redux';

const loopbackReducer = createReducer([
  {modelName: 'todos'}, {modelName: 'users'}, 
])

let reducer = combineReducers({
  todos: todoReducer,
  loopback: loopbackReducer
})

const middlewares = applyMiddleware(
  loopbackMiddleware
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  reducer,
  composeEnhancers(middlewares)
)
export default store