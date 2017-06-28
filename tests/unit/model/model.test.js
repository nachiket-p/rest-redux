import Model from '../../../src/model'

describe('Model', () => {
  it('should create a Model', () => { 
    const model = new Model({modelName: 'todos'}, { basePath: 'http://localhost:3000/api' })
    
  })
})
