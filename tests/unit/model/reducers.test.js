import { Reducer } from 'redux-testkit';
import modelReducer from '../../../src/model/modelReducer';
import Model from '../../../src/model'

const todoReducer = modelReducer({modelName: 'todo'})

const DEFAULT_STATE_NO_LIST = {"error": null, "instances": {}, "request": {"loading": false}, last:{ find: [], delete: [], custom: {} }}
describe('counter reducer', () => {
  let model
  beforeEach(()=> {
    model = new Model({modelName: 'todos'}, { basePath: 'http://localhost:3000/api' })
  })

  it('should have initial state', () => {
    expect(todoReducer(undefined, {})).toEqual(DEFAULT_STATE_NO_LIST);
  })

  //  it('should handle INCREMENT action on initial state', () => {
  //   const action = { type: 'INCREMENT' };
  //   const result = DEFAULT_STATE;
  //   Reducer(todoReducer).expect(action).toReturnState(result);
  // });


})