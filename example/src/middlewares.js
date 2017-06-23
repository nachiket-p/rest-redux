import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './user/actions'
import loopbackRedux, { todo } from './api'
const todoActions = todo.actions

export const authEventsMiddleware = store => next => action => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      debugger
      loopbackRedux.updateGlobal({
        headers: {
          'Authorization': action.payload.token.id
        }
      })
      store.dispatch(todoActions.find({}))
      break
    case LOGOUT_SUCCESS:
      loopbackRedux.updateGlobal({headers: {
        'Authorization': null
      }})
      //TODO: Fire Clean event to clear DB
      store.dispatch(todoActions.find({}))
      break
    default:
      
  }
  next(action)
};