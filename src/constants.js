// const REPLACE_OR_CREATE = 'rest-redux/REPLACE_OR_CREATE'
// const PATCH_OR_CREATE = 'rest-redux/PATCH_OR_CREAT'
// const REPLACE_BY_ID =  'rest-redux/REPLACE_BY_ID'

export const REQUEST = {
  CREATE: 'rest-redux/CREATE->request',
  FIND_BY_ID: 'rest-redux/FIND_BY_ID->request',
  FIND: 'rest-redux/FIND->request',
  DELETE_BY_ID: 'rest-redux/DELETE_BY_ID->request',
  DELETE: 'rest-redux/DELETE->request',
  UPDATE: 'rest-redux/UPDATE->request',
  UPDATE_ALL: 'rest-redux/UPDATE_ALL->request',
  COUNT: 'rest-redux/COUNT->request',
  CUSTOM: 'rest-redux/CUSTOM->request',
}

export const RESPONSE = {
  CREATE: 'rest-redux/CREATE->response',
  FIND_BY_ID: 'rest-redux/FIND_BY_ID->response',
  FIND: 'rest-redux/FIND->response',
  DELETE_BY_ID: 'rest-redux/DELETE_BY_ID->response',
  DELETE: 'rest-redux/DELETE->response',
  UPDATE: 'rest-redux/UPDATE->response',
  UPDATE_ALL: 'rest-redux/UPDATE_ALL->response',
  COUNT: 'rest-redux/COUNT->response',
  CUSTOM: 'rest-redux/CUSTOM->response',
}

export const ERROR = 'rest-redux/ERROR'
export const RECEIVED = 'rest-redux/RECEIVED'
export const CLEAR = 'rest-redux/CLEAR'

export const LIST = {
  SET_OPTIONS: 'rest-redux/SET_OPTIONS->list',
  PAGE: 'rest-redux/PAGE->list',
  NEXT: 'rest-redux/NEXT->list',
  PREV: 'rest-redux/PREV->list',
  LAST: 'rest-redux/LAST->list',
  FIRST: 'rest-redux/FIRST->list',
  REFRESH: 'rest-redux/REFRESH->list',
  SET_PARAMS:'rest-redux/SET_PARAMS->list'
}

// export const ACTION = {
//   FIND: {
//     REQUEST: REQUEST.FIND,
//     RESPONSE: RESPONSE.FIND
//   },
//   FIND_BY_ID: {
//     REQUEST: REQUEST.FIND_BY_ID,
//     RESPONSE: RESPONSE.FIND_BY_ID
//   },
//   FIND_ONE: {
//     REQUEST: REQUEST.FIND_ONE,
//     RESPONSE: RESPONSE.FIND_ONE
//   },
//   CREATE: {
//     REQUEST: REQUEST.CREATE,
//     RESPONSE: RESPONSE.CREATE
//   },
//   UPDATE: {
//     REQUEST: REQUEST.UPDATE,
//     RESPONSE: RESPONSE.UPDATE
//   },
//   UPDATE_ALL: {
//     REQUEST: REQUEST.UPDATE_ALL,
//     RESPONSE: RESPONSE.UPDATE_ALL
//   },
//   DELETE_BY_ID: {
//     REQUEST: REQUEST.DELETE_BY_ID,
//     RESPONSE: RESPONSE.DELETE_BY_ID
//   },
//   DELETE: {
//     REQUEST: REQUEST.DELETE,
//     RESPONSE: RESPONSE.DELETE
//   },
//   EXIST: {
//     REQUEST: REQUEST.EXIST,
//     RESPONSE: RESPONSE.EXIST
//   },
//   COUNT: {
//     REQUEST: REQUEST.COUNT,
//     RESPONSE: RESPONSE.COUNT
//   },
//   CUSTOM: {
//     REQUEST: REQUEST.CUSTOM,
//     RESPONSE: RESPONSE.CUSTOM
//   }
// }