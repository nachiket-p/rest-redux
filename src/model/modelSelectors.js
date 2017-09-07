import _ from 'lodash'

export default (model, apiPath, rootSelector) => {

  const getModelObj = state => rootSelector(state)[model.modelName]
  const getInstances = state => _.values(rootSelector(state)[model.modelName].instances)
  const isLoading = state => rootSelector(state)[model.modelName].request.loading
  
  const getCount = state => {
    const modelObj = getModelObj(state)
    //FIXME: shouldnt have check like this
    return modelObj.last[apiPath]?modelObj.last[apiPath].count:0
  }
  
  const getFound = state => {
    const modelObj = getModelObj(state)
    //FIXME: shouldnt have check like this
    const found = modelObj.last[apiPath]?modelObj.last[apiPath].find:[]
    const instances = rootSelector(state)[model.modelName].instances
    return _.map(found, id => instances[id])
  }

  return {
    getModelObj, getInstances, isLoading, getCount, getFound
  }
}