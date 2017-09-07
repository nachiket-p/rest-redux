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

const rxOne = /^[\],:{}\s]*$/;
const rxTwo = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
const rxThree = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
const rxFour = /(?:^|:|,)(?:\s*\[)+/g;
const isJSON = (input) => (
  input.length && rxOne.test(
    input.replace(rxTwo, '@')
      .replace(rxThree, ']')
      .replace(rxFour, '')
  )
);

function parse(response) {
  return response.text().then(function (text) {
    return isJSON(text) ? JSON.parse(text) : {}
  })
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
    //console.log('calling with options ', finalOptions, fetchOptions)
    finalOptions.method = method
    return fetch(path, finalOptions)
      .then(handleStatus)
      .then(parse)
      .then(handler)
      .catch(errorHandler)
  }
}
