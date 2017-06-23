import { createStore, combineReducers, applyMiddleware } from 'redux'
import todoReducer from './todos/reducer'
import userReducer from './user/reducer'
import {authEventsMiddleware} from './middlewares'
import {loopbackReducer, loopbackMiddleware} from './api';

let reducer = combineReducers({
  todos: todoReducer,
  user: userReducer,
  loopback: loopbackReducer
})

const middlewares = applyMiddleware(
  loopbackMiddleware,
  authEventsMiddleware
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  reducer,
  composeEnhancers(middlewares)
)
export default store