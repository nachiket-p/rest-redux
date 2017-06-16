import createEntityReducer from './entityReducer'
import {combineReducers} from 'redux'

export default (entities)  => {
  const reducers = {};
  entities.forEach(entity => reducers[entity.modelName] = createEntityReducer(entity) )

  return combineReducers(reducers)
}