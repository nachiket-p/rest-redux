import ModelActions from './ModelActions'
import modelSelectors from './modelSelectors'
import List from '../list'

export default class Model {
  constructor(model, config, apiAdapter, requestAdapter) {
    model.apiPath = model.apiPath ? config.basePath + model.apiPath : config.basePath + '/' + model.modelName

    this.modelName = model.modelName
    this.config = config
    this.actions = (routeParams) => {
      return new ModelActions(model, config, routeParams, apiAdapter, requestAdapter)
    }
    this.selectors = (routeParams) => {
      return modelSelectors(model, routeParams, config.rootSelector)
    }
    this.lists = {}
    if(model.lists) {
      model.lists.forEach(list => this.lists[list.name] = this.createList(list))
    }
  }

  createList({name, options}) {
    return new List(name, this, options)
  }
}