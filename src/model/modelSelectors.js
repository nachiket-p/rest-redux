import _ from 'lodash'

// export default class ModelSelectors {
//   constructor(model, resolver) {
//     this.modelName = model.modelName
//   }

//   export const 
//   export const isLoading = state => state.loopback.todos.request.loading
//   export const getCount = state => state.loopback.todos.last.count
// }

export default (model, rootSelector) => {
  const getInstances = state => _.values(rootSelector(state)[model.modelName].instances)
  const isLoading = state => rootSelector(state)[model.modelName].request.loading
  const getCount = state => rootSelector(state)[model.modelName].last.count
  const getFound = state => {
    const found = rootSelector(state)[model.modelName].last.find
    const instances = rootSelector(state)[model.modelName].instances
    return _.map(found, id => instances[id])
  }

  return {
    getInstances, isLoading, getCount, getFound
  }
}