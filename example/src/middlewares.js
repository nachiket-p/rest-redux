import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from './user/actions'
import loopbackRedux, { todo, myTodosList } from './api'
const todoActions = todo.actions

export const authEventsMiddleware = store => next => action => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      loopbackRedux.updateGlobal({
        headers: {
          'Authorization': action.payload.token.id
        }
      })
      store.dispatch(todoActions.find({}))
      //const {actions, selectors} = myTodosList
      // actions.setOptions({userId: 2})
      store.dispatch(myTodosList.actions.page(2))
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