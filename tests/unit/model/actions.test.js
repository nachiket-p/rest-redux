import Model from '../../../src/model'

describe('ModelActions', () => {
  let model
  beforeEach(()=> {
    model = new Model({modelName: 'todos'}, { basePath: 'http://localhost:3000/api' })
  })
  it('should create a ModelActions', () => { 
    const todoActions = model.actions()
    expect(todoActions).toBeDefined()
    expect(todoActions.create).toBeDefined()
    expect(todoActions.find).toBeDefined()
    expect(todoActions.findById).toBeDefined()
    expect(todoActions.update).toBeDefined()
    expect(todoActions.updateAll).toBeDefined()
    expect(todoActions.deleteById).toBeDefined()
    expect(todoActions.delete).toBeDefined()
    expect(todoActions.count).toBeDefined()
    expect(todoActions.custom).toBeDefined()
  })
})
