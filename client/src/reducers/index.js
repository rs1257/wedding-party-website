import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import updateReducer from './updateReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  needsUpdate: updateReducer
});