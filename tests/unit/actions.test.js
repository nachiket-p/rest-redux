import * as actions from '../../src/actions'

describe('ModelActions', () => {
  it('should create a ModelActions', () => {
    const todoActions = actions.createActions('Todo')
    expect(todoActions).not.toBeNull()
    expect(todoActions.create).not.toBeNull()
    expect(todoActions.find).not.toBeNull()
    expect(todoActions.findOne).not.toBeNull()
    expect(todoActions.findById).not.toBeNull()
    expect(todoActions.destroyById).not.toBeNull()
    expect(todoActions.count).not.toBeNull()
    expect(todoActions.exists).not.toBeNull()
    expect(todoActions.updateAll).not.toBeNull()
    expect(todoActions.updateAttributes).not.toBeNull()
  })
})
