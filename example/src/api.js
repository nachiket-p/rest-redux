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

export const todo = loopbackRedux.get('todos')
export const user = loopbackRedux.get('users')