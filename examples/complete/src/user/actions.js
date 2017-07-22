import { user } from '../api'

const userActions = user.actions()
export const LOGIN_SUCCESS = 'USER/LOGIN_SUCCESS'
export const LOGIN_FAILED = 'USER/LOGIN_FAILED'
export const LOGOUT_SUCCESS = 'USER/LOGOUT_SUCCESS'

export const login = (email, password) => (dispatch) => {
  const options = { body: { email, password } }
  dispatch(userActions.custom('LOGIN', 'login', 'POST', options))
    .then(response => {
      console.log('LOGIN SUCCESS', response)
      dispatch(loginSuccess({email}, response))
    })
    .catch(error => {
      console.log('LOGIN FAILED', error)
      if(error.response.status == 401) {
        //TODO: Implement inline / toast message
        alert('Please enter correct username & password')
        dispatch({type: LOGIN_FAILED, payload:  error })
      }
    })
}

export const loginSuccess = (profile, token) => ({type: LOGIN_SUCCESS, payload: {profile, token}})

export const logout = () => ({type: LOGOUT_SUCCESS, payload: {}})

