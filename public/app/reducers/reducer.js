import apartementReducer from './apartement-reducer';
import loginReducer from './login-reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  apartementReducer,
  loginReducer
})

export default reducer;
