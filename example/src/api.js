import LoopbackRedux from 'redux-loopback';

const loopbackRedux = new LoopbackRedux({
  basePath: 'http://localhost:3000/api',
  models: [{ 
    modelName: 'todos',
    schema: { //Uses normalizr.js (https://github.com/paularmstrong/normalizr)
      definition: {},
      options: {}
    }
  }, { 
    modelName: 'users' 
  },]
})

export const loopbackReducer = loopbackRedux.reducer
export const loopbackMiddleware = loopbackRedux.middleware

export const todoActions = loopbackRedux.get('todos').actions
export const userActions = loopbackRedux.get('users').actions