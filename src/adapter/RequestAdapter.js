
export default class RequestResolver {
  constructor(config) {
    this.globalOptions = config.globalOptions
  }

  create(data, model) {
    //{params, body, headers}
    return {
      url: model.apiPath,
      method: 'POST',
      options: { 
        body: JSON.stringify(data) 
      }
    }
  }

  update(id, data, model) {
    return {
      url: `${model.apiPath}/${id}`,
      method: 'PATCH',
      options: {
        body: JSON.stringify(data)
      }
    }
  }

  updateAll(where, data, model) {
    const params = { where: JSON.stringify(where) }
    const body = JSON.stringify(data)

    return {
      url: `${model.apiPath}/update`,
      method: 'POST',
      options: { params, body }
    }
  }

  find(filter, model) {
    const params = { filter: JSON.stringify(filter) }
    return {
      url: model.apiPath,
      method: 'GET',
      options: { params }
    }
  }

  findById(id, filter, model) {
    const params = filter ? { filter: JSON.stringify(filter) } : null
    return {
      url: `${model.apiPath}/${id}`,
      method: 'GET',
      options: { params }
    }
  }

  deleteById(id, model) {
    return {
      url: `${model.apiPath}/${id}`,
      method: 'DELETE',
      options: { }
    }
  }

  count(where, model) {
    const params = { where: JSON.stringify(where) }
    return {
      url: `${model.apiPath}/count`,
      method: 'GET',
      options: { params }
    }
  }

  custom(name, path, method, options = {}, model) {
    const _options = { headers: options.headers }
    if (options.params) _options.params = JSON.stringify(options.params)
    if (options.body) _options.body = JSON.stringify(options.body)

    return {
      url: `${model.apiPath}/${path}`,
      method,
      options: _options
    }
  }
}