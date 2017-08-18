import RestRedux from 'rest-redux';

const restRedux = new RestRedux({
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
      {name:'incomplete', options: {
        pageSize: 3, 
        params: {
          where:{completed:false}
        }
      }},
      {name:'completed', options: {
        pageSize: 3, 
        params: {
          where:{completed:true}
        }
      }},
    ],
    schema: { //Uses normalizr.js (https://github.com/paularmstrong/normalizr)
      definition: {},
      options: {}
    }
  }, { 
    modelName: 'users' 
  },]
})

export default restRedux
//TODO: Should I use action instead??
//TODO: Implement with Login

export const restReduxReducer = restRedux.reducer
export const restReduxMiddleware = restRedux.middleware

export const todo = restRedux.get('todos')
export const user = restRedux.get('users')

export const completedTodos = todo.lists.completed
export const incompleteTodos = todo.lists.incomplete


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
