import createModelReducer from './model/modelReducer'
import {combineReducers} from 'redux'

export default (entities)  => {
  const reducers = {};
  entities.forEach(entity => reducers[entity.modelName] = createModelReducer(entity) )

  return combineReducers(reducers)
}