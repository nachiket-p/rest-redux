export const CREATE = 'loopback-redux/CREATE'
export const FIND_BY_ID = 'loopback-redux/FIND_BY_ID'
export const FIND = 'loopback-redux/FIND'
export const FIND_ONE = 'loopback-redux/FIND_ONE'
export const DESTROY_BY_ID = 'loopback-redux/DESTROY_BY_ID'
export const UPDATE_ATTRIBUTES = 'loopback-redux/UPDATE_ATTRIBUTES'
export const UPDATE_ALL = 'loopback-redux/UPDATE_ALL'
export const EXISTS = 'loopback-redux/EXISTS'
export const COUNT = 'loopback-redux/COUNT'

export const CUSTOM = 'loopback-redux/CUSTOM'
export const REPLACE_OR_CREATE = 'loopback-redux/REPLACE_OR_CREATE'
export const PATCH_OR_CREATE = 'loopback-redux/PATCH_OR_CREAT'
export const REPLACE_BY_ID = 'loopback-redux/REPLACE_BY_ID'


export const Methods = {
  CREATE, EXISTS, FIND_BY_ID, FIND, FIND_ONE, DESTROY_BY_ID, COUNT, UPDATE_ATTRIBUTES, UPDATE_ALL
}

const ModelActions = class {
  constructor(modelName) {
    this.modelName = modelName
  }

  create(data) {
    return { type: CREATE, payload: { modelName: this.modelName, data } }
  }
  find(filter) {
    return { type: FIND, payload: { modelName: this.modelName, filter } }
  }
  findOne(filter) {
    return { type: FIND_ONE, payload: { modelName: this.modelName, filter } }
  }
  findById(id, filter) {
    return { type: FIND_BY_ID, payload: { modelName: this.modelName, id, filter } }
  }
  destroyById(id) {
    return { type: DESTROY_BY_ID, payload: { modelName: this.modelName, id } }
  }
  count(filter) {
    return { type: COUNT, payload: { modelName: this.modelName, filter } }
  }
  exists(filter) {
    return { type: EXISTS, payload: { modelName: this.modelName, exists } }
  }
  updateAll(filter, data) {
    return { type: UPDATE_ALL, payload: { modelName: this.modelName, filter, data } }
  }
  updateAttributes(id, filter) {
    return { type: UPDATE_ATTRIBUTES, payload: { modelName: this.modelName, filter } }
  }
}

export const createActions = (modelName) => new ModelActions(modelName)