import _ from 'lodash'

export default (modelSelector, list, rootSelector) => {
  // const getInstances = state => _.values(rootSelector(state)[model.modelName].instances)
  // const isLoading = state => rootSelector(state)[model.modelName].request.loading
  // const getCount = state => rootSelector(state)[model.modelName].last.count
  // const getFound = state => {
  //   const found = rootSelector(state)[model.modelName].last.find
  //   const instances = rootSelector(state)[model.modelName].instances
  //   return _.map(found, id => instances[id])
  // }
  const _getListObj = (state) => rootSelector(state).lists[list]

  const getTotal = (state) => _getListObj(state).total
  const isFirst = (state) => _getListObj(state).offset == 0
  const isLast = (state) => {
    _getListObj(state).offset == 0
  }
  const getInstances = (state) => {
    const result = _getListObj(state).result
    const instances = modelSelector.getInstances(state)
    return _.map(result, id => instances[id])
  }
  const getCurrent = (state) => {
    const listObj = _getListObj(state)
    return Math.ceil(listObj.offset/listObj.pageSize)
  }
  const getPages = (state) => {
    const listObj = _getListObj(state)
    const pages = Math.ceil(listObj.total/listObj.pageSize)
    return [...Array(10)].map((_, i) => ++i)
  }
  return {
    getInstances, getTotal, getPages, isFirst, isLast
  }
}