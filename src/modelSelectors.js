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
  return {
    getAll: state => _.values(rootSelector(state)[model.modelName].instances),
    isLoading: state => rootSelector(state)[model.modelName].request.loading,
    getCount: state => rootSelector(state)[model.modelName].last.count
  }
}