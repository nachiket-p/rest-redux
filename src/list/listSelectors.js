import _ from 'lodash'

export default (list, modelSelectors) => {
  
  const getListObj = (state) => modelSelectors.getModelObj(state).lists[list]
  
  const getTotal = (state) => getListObj(state).total
  
  const getInstances = (state) => {
    const result = getListObj(state).result
    //modelSelectors.getInstances() won't work, as it returns Array, instead of Object Map
    const instances = modelSelectors.getModelObj(state).instances 
    return _.map(result, id => instances[id])
  }

  const getCurrentPage = (state) => {
    const listObj = getListObj(state)
    return Math.ceil(listObj.offset/listObj.pageSize)
  }

  const getPages = (state) => {
    const listObj = getListObj(state)
    const pages = Math.ceil(listObj.total/listObj.pageSize)
    return [...Array(pages)].map((_, i) => i++)
  }
  const hasNext = (state) => {
    const listObj = getListObj(state)
    return (listObj.offset + listObj.pageSize < listObj.total)
  }

  const hasPrev = (state) => getListObj(state).offset > 0

  const getPageSize = (state) => {
    const listObj = getListObj(state)
    return listObj.pageSize
  }

  return {
    getListObj, getInstances, getTotal, getPages, getCurrentPage, hasNext, hasPrev, getPageSize
  }
}