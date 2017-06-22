import _ from 'lodash'
import queryString from 'query-string'

function handleStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parse(response) {
  return response.json()
}

//TODO: Add custom fetch support with subclassing
export default class APIAdapter {
  constructor(config) {
    this.globalOptions = config.globalOptions
  }

  fetch(path, method, fetchOptions, handler, errorHandler) {
    const finalOptions = _.merge({}, this.globalOptions, fetchOptions)
    const { params } = finalOptions
    if (params && !_.isEmpty(params)) {
      path = `${path}?${queryString.stringify(params)}`
      delete fetchOptions.params
    }
    console.log('calling with options ', finalOptions, fetchOptions)
    finalOptions.method = method
    return fetch(path, finalOptions)
      .then(handleStatus)
      .then(parse)
      .then(handler)
      .catch(errorHandler)
  }
}