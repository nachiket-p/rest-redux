import createModelReducer from './model/modelReducer'
import {combineReducers} from 'redux'

export default (models)  => {
  const reducers = {};
  models.forEach(model => reducers[model.modelName] = createModelReducer(model) )

  return combineReducers(reducers)
}