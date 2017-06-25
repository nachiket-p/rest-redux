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
    lists: [
      {name:'personal', options:{pageSize: 5}},
      {name:'public'}
    ],
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

const options = {
  pageSize:10,
  startPage: 0 
}
export const myTodosList = todo.lists.personal


// actions.next() //page
// actions.prev()
// actions.first()
// actions.last()

// selectors.getInstances()
// selectors.getTotal()
// selectors.getPages()
// selectors.isFirst()
// selectors.isLast()

//myTodosList.setOptions({pageSize, startPage})

//HOC: 
// list(name, filter) => {instances, pages, total, isFirst, isLast}
