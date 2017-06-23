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


const loopbackRedux = new LoopbackRedux({
  basePath: 'http://localhost:3000/api',
  models: [{ 
    modelName: 'todos',
    //Uses normalizr.js for schema (https://github.com/paularmstrong/normalizr)
    schema: { 
      definition: {},
      options: {}
    }
  }, { 
    modelName: 'users' 
  }]
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

// create actions for each model using following API
export const todoActions = loopbackRedux.createActions('todos')
export const userActions = loopbackRedux.createActions('users')

```

### Using Actions  
**Available methods:**
create, update, updateAll, deleteById, find, findById, 

```javascript
const todoActions = loopbackRedux.createActions('todos')

//create Todo
dispatch(todoAction.create({text:'This is new todo'}))

//update Todo
dispatch(todoAction.update(1, {completed:true}))

//delete todo
dispatch(todoAction.deleteById(1))
```

### Using Listing methods
Listing methods provides easy way to manage multiple listing for any model.

```javascript
// State saved to loopback-state -> modelName -> lists -> default
dispatch(todoAction.find({completed:false))

// State saved to loopback-state -> modelName -> lists -> NOT_COMPLETED
dispatch(todoAction.find({completed:false), 'NOT_COMPLETED')

```