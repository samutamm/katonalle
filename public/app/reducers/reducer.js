import apartementReducer from './apartement-reducer';
import loginReducer from './login-reducer';
import registerReducer from './register-reducer';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  apartementReducer,
  loginReducer,
  register
})

export default reducer;
