# rest-redux
Provides actions & reducers to communicate with REST API Backend. 

[![Build Status](https://travis-ci.org/nachiket-p/rest-redux.svg?branch=master)](https://travis-ci.org/nachiket-p/rest-redux)
[![Coverage](https://codecov.io/gh/nachiket-p/rest-redux/branch/master/graph/badge.svg)](https://codecov.io/gh/nachiket-p/rest-redux)
[![npm version](https://badge.fury.io/js/rest-redux.svg)](https://badge.fury.io/js/rest-redux)

#### NOTE: WIP, Under active development. And will support [Loopback](http://loopback.io) API out of the box, as its intended to use on that internally

## Summary
rest-redux makes communication with REST API very easy. It reduces lot of boilerplate code. 
It manages normalized redux state for apis & provides easy to use actions/selectors.

## Installation
Add rest-redux to your package.json dependencies.  

```npm install rest-redux --save```


## Code

### Setup rest-redux 

```javascript
import { createStore, combineReducers, applyMiddleware } from 'redux'
import RestRedux from 'rest-redux'

const restRedux = new RestRedux({
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
  rest: restRedux.reducer,
  otherReducers: ...
})

const middlewares = applyMiddleware(
  restRedux.middleware
);

let store = createStore(
  reducer,
  middlewares
)

// create actions/selectors for each model  using following API
export const todo = restRedux.get('todos')
export const user = restRedux.get('users')

const todoActions = todo.actions
const todoSelectors = todo.selectors

```

### Using Actions  
**Available methods:**
create, update, updateAll, deleteById, find, findById, 

```javascript
const todoActions = restRedux.get('todos').actions

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
const todoSelectors = restRedux.get('todos').selectors
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
const todos = restRedux.get('todos')
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
import listHoc from 'rest-redux'

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

