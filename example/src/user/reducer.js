import { combineReducers } from 'redux'
import { LOGIN_SUCCESS, LOGIN_FAILED, LOGOUT_SUCCESS } from './actions'

const DEFAULT = { 
  profile: null,
  token: null,
  error: null
}
function auth(state = DEFAULT, action) {
  const {payload} = action
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        profile: payload.profile,
        token: payload.token,
      }
    case LOGIN_FAILED:
      return { ...DEFAULT, error: payload }
    case LOGOUT_SUCCESS:
      return DEFAULT
    default:
      return state
  }
}

export default combineReducers({
  auth
})
