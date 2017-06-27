import _ from 'lodash'
import { LIST } from '../constants'

const { SET_OPTIONS, PAGE, FIRST, NEXT, LAST, PREV } = LIST
export default class ListActions {
  constructor(listName, listSelectors, modelActions) {
    this.modelActions = modelActions
    this.listSelectors = listSelectors
    this.listName = listName
  }

  setOptions({ headers, params, pageSize }) {
    const payload = _.omitBy({ headers, params, pageSize, listName: this.listName }, _.isNil)
    return { type: SET_OPTIONS, payload }
  }

  _page(page, dispatch, state) {
    dispatch({ type: PAGE, payload: { page } })
    
    const listObj = this.listSelectors.getListObj(state)    
    const where = listObj.params
    const filter = { where, limit: listObj.pageSize, skip: page * listObj.pageSize }
    
    dispatch(this.modelActions.find(filter, this.listName))
    dispatch(this.modelActions.count(where, this.listName))
  }

  page(page) {
    return (dispatch, getState) => this._page(page, dispatch, getState())
  }

  next() {
    return (dispatch, getState) => {
      const currentPage = this.listSelectors.getCurrentPage(getState())
      return this._page(currentPage + 1, dispatch, getState())
    }
  }

  prev() {
    return (dispatch, getState) => {
      const currentPage = this.listSelectors.getCurrentPage(getState())
      return this._page(currentPage - 1, dispatch, getState())
    }
  }

  refresh() {
    return (dispatch, getState) => {
      const currentPage = this.listSelectors.getCurrentPage(getState())
      return this._page(currentPage, dispatch, getState())
    }
  }

  first() {
    return (dispatch, getState) => this._page(0, dispatch, getState())
  }

  last() {
    return (dispatch, getState) => {
      const state = getState()
      const pageSize = this.listSelectors.getListObj(state).pageSize
      const total = this.listSelectors.getTotal(state)
      return this._page(Math.floor(total / pageSize), dispatch, state)
    }
  }
}
