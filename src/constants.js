const REPLACE_OR_CREATE = 'redux-loopback/REPLACE_OR_CREATE'
const PATCH_OR_CREATE = 'redux-loopback/PATCH_OR_CREAT'
const REPLACE_BY_ID =  'redux-loopback/REPLACE_BY_ID'

export const REQUEST = {
  CREATE: 'redux-loopback/CREATE->request',
  FIND_BY_ID: 'redux-loopback/FIND_BY_ID->request',
  FIND: 'redux-loopback/FIND->request',
  FIND_ONE: 'redux-loopback/FIND_ONE->request',
  DELETE_BY_ID: 'redux-loopback/DELETE_BY_ID->request',
  DELETE: 'redux-loopback/DELETE->request',
  UPDATE: 'redux-loopback/UPDATE->request',
  UPDATE_ALL: 'redux-loopback/UPDATE_ALL->request',
  EXISTS: 'redux-loopback/EXISTS->request',
  COUNT: 'redux-loopback/COUNT->request',
  CUSTOM: 'redux-loopback/CUSTOM->request',
}

export const RESPONSE = {
  CREATE: 'redux-loopback/CREATE->response',
  FIND_BY_ID: 'redux-loopback/FIND_BY_ID->response',
  FIND: 'redux-loopback/FIND->response',
  FIND_ONE: 'redux-loopback/FIND_ONE->response',
  DELETE_BY_ID: 'redux-loopback/DELETE_BY_ID->response',
  DELETE: 'redux-loopback/DELETE->response',
  UPDATE: 'redux-loopback/UPDATE->response',
  UPDATE_ALL: 'redux-loopback/UPDATE_ALL->response',
  EXISTS: 'redux-loopback/EXISTS->response',
  COUNT: 'redux-loopback/COUNT->response',
  CUSTOM: 'redux-loopback/CUSTOM->response',
}

export const ACTION = {
  FIND: {
    REQUEST: REQUEST.FIND,
    RESPONSE: RESPONSE.FIND
  },
  FIND_BY_ID: {
    REQUEST: REQUEST.FIND_BY_ID,
    RESPONSE: RESPONSE.FIND_BY_ID
  },
  FIND_ONE: {
    REQUEST: REQUEST.FIND_ONE,
    RESPONSE: RESPONSE.FIND_ONE
  },
  CREATE: {
    REQUEST: REQUEST.CREATE,
    RESPONSE: RESPONSE.CREATE
  },
  UPDATE: {
    REQUEST: REQUEST.UPDATE,
    RESPONSE: RESPONSE.UPDATE
  },
  UPDATE_ALL: {
    REQUEST: REQUEST.UPDATE_ALL,
    RESPONSE: RESPONSE.UPDATE_ALL
  },
  DELETE_BY_ID: {
    REQUEST: REQUEST.DELETE_BY_ID,
    RESPONSE: RESPONSE.DELETE_BY_ID
  },
  DELETE: {
    REQUEST: REQUEST.DELETE,
    RESPONSE: RESPONSE.DELETE
  },
  EXIST: {
    REQUEST: REQUEST.EXIST,
    RESPONSE: RESPONSE.EXIST
  },
  COUNT: {
    REQUEST: REQUEST.COUNT,
    RESPONSE: RESPONSE.COUNT
  },
  CUSTOM: {
    REQUEST: REQUEST.CUSTOM,
    RESPONSE: RESPONSE.CUSTOM
  }
}

export const ERROR = 'redux-loopback/ERROR'
export const RECEIVED = 'redux-loopback/RECEIVED'
export const CLEAR = 'redux-loopback/CLEAR'