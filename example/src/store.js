import { createStore, combineReducers, applyMiddleware } from 'redux'
import todoReducer from './todos/reducer'
import {reducer as loopbackReducer} from 'redux-loopback';

let reducer = combineReducers({
  todos: todoReducer,
  loopback: loopbackReducer
})
const createStoreWithMiddleware = applyMiddleware(
  //loopbackMiddleware(null)
)(createStore);

let store = createStoreWithMiddleware(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default store