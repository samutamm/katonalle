import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import reducer from '../../../public/app/reducers/reducer';

describe('reducer', () => {

  it('initial value', () => {
    const action = {
      type: 'NOT_EXISTING_ACTION'
    };
    const newState = reducer(undefined, action);
    expect(newState.loginReducer.getIn(['session', 'isChecking'])).to.equal(false);
  });

  it('REQUEST_LOGIN adds fetching tag', () => {
    const action = {
      type: 'REQUEST_LOGIN'
    };
    const newState = reducer(undefined, action);
    expect(newState.loginReducer.getIn(['session', 'isChecking'])).to.equal(true);
  });

  it('RECEIVE_TOKEN adds token', () => {
    const action = {
      type: 'RECEIVE_TOKEN',
      token: 'dsaseir3r32'
    };
    const newState = reducer(undefined, action);
    expect(newState.loginReducer.getIn(['session', 'token'])).to.equal(action.token);
  });

});
