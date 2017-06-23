import ModelActions from '../../src/ModelActions'

describe('ModelActions', () => {
  it('should create a ModelActions', () => { 
    const todoActions = new ModelActions('todos', {basePath: 'http://localhost:3000/api'})
    expect(todoActions).toBeDefined()
    expect(todoActions.create).toBeDefined()
    expect(todoActions.find).toBeDefined()
    expect(todoActions.findOne).toBeDefined()
    expect(todoActions.findById).toBeDefined()
    expect(todoActions.update).toBeDefined()
    expect(todoActions.updateAll).toBeDefined()
    expect(todoActions.delete).toBeDefined()
    expect(todoActions.deleteAll).toBeDefined()
    expect(todoActions.count).toBeDefined()
    expect(todoActions.exists).toBeDefined()
  })
})
