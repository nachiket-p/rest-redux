import ListActions from './ListActions'
import listSelectors from './listSelectors'

export default class List {
  constructor(listName, model, options) {
    this.listName = listName
    this.selectors = listSelectors(listName, model.selectors)
    this.actions = new ListActions(listName, this.selectors, model.actions)
  }
}