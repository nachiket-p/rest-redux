import _ from 'lodash'
import { LIST } from '../constants'

const { SET_OPTIONS, PAGE, FIRST, NEXT, LAST, PREV } = LIST
export default class ListActions {
  constructor(listName, listSelectors, modelActions) {
    this.modelActions = modelActions
    this.listSelectors = listSelectors
    this.listName = listName
  }

  setOptions({ headers, params }) {
    return { type: SET_OPTIONS, payload: { headers, params, listName: this.listName } }
  }

  page(page) {
    return (dispatch, getState) => {
      dispatch({ type: PAGE, payload: { page } })
      const listObj = this.listSelectors.getListObj(getState())
      const filter = JSON.stringify({ limit: listObj.pageSize, skip: page * listObj.pageSize })
      dispatch(this.modelActions.find({ filter: filter }, this.listName))
    }

  }

  // next() {

  // } 

  // prev() {

  // }

  // first() {

  // }

  // last() {

  // }
}
