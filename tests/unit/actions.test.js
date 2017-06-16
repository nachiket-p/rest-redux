import * as actions from '../../src/actions'

describe('ModelActions', () => {
  it('should create a ModelActions', () => { 
    const todoActions = actions.createActions('Todo')
    expect(todoActions).toBeDefined()
    expect(todoActions.create).toBeDefined()
    expect(todoActions.find).toBeDefined()
    expect(todoActions.findOne).toBeDefined()
    expect(todoActions.findById).toBeDefined()
    expect(todoActions.destroyById).toBeDefined()
    expect(todoActions.count).toBeDefined()
    expect(todoActions.exists).toBeDefined()
    expect(todoActions.updateAll).toBeDefined()
    expect(todoActions.update).toBeDefined()
  })
})
