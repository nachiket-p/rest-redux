import ListActions from './ListActions'
import listSelectors from './listSelectors'

export default class List {
  constructor(listName, model, options) {
    this.listName = listName
    this.selectors = (routeParams) => listSelectors(listName, model.selectors(routeParams))
    this.actions = (routeParams) => new ListActions(listName, this.selectors(routeParams), model, model.actions(routeParams))
  }
}