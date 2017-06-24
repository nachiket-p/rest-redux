
class ListActions {

}
const listSelectors = (list, rootSelector) => ({})

export default class List {
  constructor(listName, config, apiAdapter) {
    this.listName = listName
    this.actions = new ListActions(listName, config, apiAdapter)
    this.selectors = listSelectors(listName, config.rootSelector)
  }
}