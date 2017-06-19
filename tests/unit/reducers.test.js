import { Reducer } from 'redux-testkit';
import entityReducer from '../../src/entityReducer';

const todoReducer = entityReducer({modelName: 'todo'})

const DEFAULT_STATE = {"error": null, "instances": {}, "request": {"loading": false}}
describe('counter reducer', () => {

  it('should have initial state', () => {
    expect(todoReducer(undefined, {})).toEqual(DEFAULT_STATE);
  })

   it('should handle INCREMENT action on initial state', () => {
    const action = { type: 'INCREMENT' };
    const result = DEFAULT_STATE;
    Reducer(todoReducer).expect(action).toReturnState(result);
  });


})