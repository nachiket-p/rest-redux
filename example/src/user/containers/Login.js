import React from 'react'
import { connect } from 'react-redux'

import Login  from '../components/Login'
import { login, logout } from '../actions'
import {isLoggedIn, getProfile, getError} from '../selectors'


const mapStateToProps = (state) => ({
  isLoggedIn: isLoggedIn(state),
  profile: getProfile(state),
  error: getError(state)
})

const mapDispatchToProps = {
  login,
  logout
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)