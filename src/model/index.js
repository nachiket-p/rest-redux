import ModelActions from './ModelActions'
import modelSelectors from './modelSelectors'
import List from '../list'

export default class Model {
  constructor(model, config, apiAdapter) {
    this.modelName = model.modelName
    this.config = config
    this.actions = new ModelActions(model, config, apiAdapter)
    this.selectors = modelSelectors(model, config.rootSelector)
    this.lists = {}
    if(model.lists) {
      model.lists.forEach(list => this.lists[list.name] = this.createList(list))
    }
  }

  createList({name, options}) {
    return new List(name, this, this.config)
  }
}