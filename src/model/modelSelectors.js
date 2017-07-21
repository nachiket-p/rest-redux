import _ from 'lodash'

export default (model, routeParams, rootSelector) => {
  const getModelObj = state => rootSelector(state)[model.modelName]
  const getInstances = state => _.values(rootSelector(state)[model.modelName].instances)
  const isLoading = state => rootSelector(state)[model.modelName].request.loading
  const getCount = state => rootSelector(state)[model.modelName].last.count
  const getFound = state => {
    const found = rootSelector(state)[model.modelName].last.find
    const instances = rootSelector(state)[model.modelName].instances
    return _.map(found, id => instances[id])
  }

  return {
    getModelObj, getInstances, isLoading, getCount, getFound
  }
}