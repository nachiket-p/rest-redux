import React from 'react'
import PropTypes from 'prop-types'

const LoggedInView = ({profile, logout}) => <p>{profile.email} | <button onClick={logout}>Logout</button></p>

export default ({ login, logout, isLoggedIn, profile, error }) => {
  let email, password
  console.log('login status in component', isLoggedIn)
  const errorView = error?<p>ERROR: Wrong email or password</p>:null

  const loginForm =<div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!email.value.trim() || !password.value.trim()) {
          return
        }
        login(email.value, password.value)
        email.value = ''
        password.value = ''
      }}>
        <input type='email' placeholder='email' ref={node => { email = node }} />
        <input type='password' placeholder='password' ref={node => { password = node }} />
        <button type="submit">Login</button>
      </form>
      <blockquote>use john@doe.com / jane@doe.com with password 'gotthemilk'</blockquote>
      {errorView}
    </div>
  
  return isLoggedIn ? <LoggedInView profile={profile} logout={logout}/> : loginForm
    
}