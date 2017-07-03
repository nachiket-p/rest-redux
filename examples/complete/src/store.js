import { createStore, combineReducers, applyMiddleware } from 'redux'
import todoReducer from './todos/reducer'
import userReducer from './user/reducer'
import {authEventsMiddleware} from './middlewares'
import {restReduxReducer, restReduxMiddleware} from './api';
import thunk from 'redux-thunk'
let reducer = combineReducers({
  todos: todoReducer,
  user: userReducer,
  rest: restReduxReducer
})

const middlewares = applyMiddleware(
  thunk,
  restReduxMiddleware,
  authEventsMiddleware
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(
  reducer,
  composeEnhancers(middlewares)
)
export default store