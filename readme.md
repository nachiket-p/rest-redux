# redux-loopback
Provides actions & reducers to communicate with loopback backend. 

## NOTE: WIP, Under active development. 

## Summary
redux-loopback makes communication with loopback server very easy. 
It manages normalized data state for apis & provides easy to use api.

## Installation
Add redux-loopback to your package.json dependencies.  

```npm install redux-loopback --save```


## Code

### Setup redux-loopback 

```javascript
import { createStore, combineReducers, applyMiddleware } from 'redux'
import LoopbackRedux from 'redux-loopback';

import LoopbackRedux from 'redux-loopback';

const loopbackRedux = new LoopbackRedux({
  basePath: 'http://localhost:3000/api',  
  globalOptions: {  //global options, you can set headers & params 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  },
  models: [{ 
    modelName: 'todos',
    lists: [  //List allow to fetch paging data
      {name:'my', options:{pageSize: 5}},
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

let reducer = combineReducers({
  loopback: loopbackRedux.reducer,
  otherReducers: ...
})

const middlewares = applyMiddleware(
  loopbackRedux.loopback
);

let store = createStore(
  reducer,
  middlewares
)

// create actions/selectors for each model  using following API
export const todo = loopbackRedux.get('todos')
export const user = loopbackRedux.get('users')

const todoActions = todo.actions
const todoSelectors = todo.selectors

```

### Using Actions  
**Available methods:**
create, update, updateAll, deleteById, find, findById, 

```javascript
const todoActions = loopbackRedux.get('todos').actions

//create Todo
dispatch(todoActions.create({text:'This is new todo'}))

//update Todo
dispatch(todoActions.update(1, {completed:true}))

//delete todo
dispatch(todoActions.deleteById(1))
```

### Using Selectors  
**Available methods:**
getInstances, isLoading, getCount, getFound 

```javascript
const todoSelectors = loopbackRedux.get('todos').selectors
//get All available instances
todoSelectors.getInstances(state)

//get All last find result instances
todoSelectors.getFound(state)

//get Count API result
todoSelectors.getCount(state)

//get loading state, true when any API is executing on the Model
todoSelectors.isLoading(state)

```

### Using Lists (At Concept stage )
List feature provides easy way to manage multiple find/filter REST requests with paging for any model.

#### Actions & Selectors
```javascript
const todos = loopbackRedux.get('todos')
//each list instance has actions & selectors
const myTodosList = todos.lists.my

dispatch(myTodosList.actions.setOptions({params: {userId: myId} }))
dispatch(myTodosList.actions.page(2))

//Get all instances found in this list
myTodosList.selectors.getInstances(state)

//Returns the current page
myTodosList.selectors.getCurrentPage(state)

//Returns list of page numbers
myTodosList.selectors.getPages(state)

//Returns total number of pages available
myTodosList.selectors.getTotal(state)

//Returns whether page is first or not
myTodosList.selectors.isFirst(state)

//Returns whether page is last or not
myTodosList.selectors.isLast(state)
```

#### List HOC (Higher Order Component)
```javascript
import listHoc from 'redux-loopback'

listHoc('my')(MyTodoView)
const MyTodoView => ({instances, pages, total, isFirst, isLast}) {
  return <div>
    ....
  </div>
}
```


### Running Example
It works directly with src folder (using Webpack alias).
you need to do npm install in /, /example & /example/server before starting  

#### Start Backend Server (with in memory DB & dummy Data)
```bash
cd example/server
npm start
```

#### Start Front end App Development Server 
```bash
cd example
npm start
```

