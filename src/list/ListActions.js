import _ from 'lodash'
import { LIST } from '../constants'

const { SET_OPTIONS, PAGE, FIRST, NEXT, LAST, PREV } = LIST
export default class ListActions {
  constructor(listName, listSelectors, model, modelActions) {
    this.modelActions = modelActions
    this.listSelectors = listSelectors
    this.listName = listName
    this.modelName = model.modelName
  }

  setOptions({ headers, params, pageSize, offset }) {
    const payload = _.omitBy({ headers, params, pageSize, offset, listName: this.listName, modelName: this.modelName }, _.isNil)
    return { type: SET_OPTIONS, payload }
  }

  _page(page, dispatch, state) {
    dispatch({ type: PAGE, payload: { page, listName: this.listName, modelName: this.modelName } })

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
      let hasNext = this.listSelectors.hasNext(getState())
      if (hasNext) {
        const currentPage = this.listSelectors.getCurrentPage(getState())
        return this._page(currentPage + 1, dispatch, getState())
      }
    }
  }

  prev() {
    return (dispatch, getState) => {
      let hasPrev = this.listSelectors.hasPrev(getState())
      if (hasPrev) {
        const currentPage = this.listSelectors.getCurrentPage(getState())
        return this._page(currentPage - 1, dispatch, getState())
      }
    }
  }

  refresh() {
    return (dispatch, getState) => {
      const currentPage = this.listSelectors.getCurrentPage(getState())
      return this._page(currentPage, dispatch, getState())
    }
  }

  first() {
    return (dispatch, getState) => {
      let hasPrev = this.listSelectors.hasPrev(getState())
      if (hasPrev) {
        return this._page(0, dispatch, getState())
      }
    }
  }

  last() {
    return (dispatch, getState) => {
      const state = getState()
      let hasNext = this.listSelectors.hasNext(state)
      if (hasNext) {
        const pageSize = this.listSelectors.getListObj(state).pageSize
        const total = this.listSelectors.getTotal(state)
        return this._page(Math.floor(total / pageSize), dispatch, state)
      }
    }
  }
}
