import _ from 'lodash';
function template(str, data) {
  data = data || {};

  const matcher = str.match(/{(.+?)}/g);
  if(!matcher) return str
  
  matcher.forEach(function(key) {
   str = str.replace(key, data[key.replace('{','').replace('}', '')]);
  });
  return str;
}

export default class RequestResolver {
  constructor(config) {
    this.globalOptions = config.globalOptions
  }

  resolveRouteParams(model, routeParams) {
    console.log('Resolving Route: ', model, routeParams)
    return template(model.apiPath, routeParams)
  }

  create(data, requestOptions) {
    //{params, body, headers}
    return {
      url: requestOptions.apiPath,
      method: 'POST',
      options: { 
        body: JSON.stringify(data) 
      }
    }
  }

  update(id, data, requestOptions) {
    return {
      url: `${requestOptions.apiPath}/${id}`,
      method: 'PATCH',
      options: {
        body: JSON.stringify(data)
      }
    }
  }

  updateAll(where, data, requestOptions) {
    const params = { where: JSON.stringify(where) }
    const body = JSON.stringify(data)

    return {
      url: `${requestOptions.apiPath}/update`,
      method: 'POST',
      options: { params, body }
    }
  }

  find(filter, requestOptions) {
    const params = { filter: JSON.stringify(filter) }
    return {
      url: requestOptions.apiPath,
      method: 'GET',
      options: { params }
    }
  }

  findById(id, filter, requestOptions) {
    const params = filter ? { filter: JSON.stringify(filter) } : null
    return {
      url: `${requestOptions.apiPath}/${id}`,
      method: 'GET',
      options: { params }
    }
  }

  deleteById(id, requestOptions) {
    return {
      url: `${requestOptions.apiPath}/${id}`,
      method: 'DELETE',
      options: { }
    }
  }

  count(where, requestOptions) {
    const params = { where: JSON.stringify(where) }
    return {
      url: `${requestOptions.apiPath}/count`,
      method: 'GET',
      options: { params }
    }
  }

  custom(name, path, method, options = {}, requestOptions) {
    const _options = { headers: options.headers }
    if (options.params) _options.params = _.mapValues(options.params,(value)=>{
      return JSON.stringify(value);
    })
    if (options.body) _options.body = JSON.stringify(options.body)

    return {
      url: `${requestOptions.apiPath}/${path}`,
      method,
      options: _options
    }
  }
}