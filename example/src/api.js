import LoopbackRedux from 'redux-loopback';

const loopbackRedux = new LoopbackRedux({
  basePath: 'http://localhost:3000/api',
  globalOptions: {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
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

export default loopbackRedux
//TODO: Should I use action instead??
//TODO: Implement with Login

export const loopbackReducer = loopbackRedux.reducer
export const loopbackMiddleware = loopbackRedux.middleware

export const todo = loopbackRedux.get('todos')
export const user = loopbackRedux.get('users')

// const options = {params: {}, body: {}, headers: {}}
//export const myTodos = todo.createList('paging', options)
//const {actions, selectors} = myTodos
