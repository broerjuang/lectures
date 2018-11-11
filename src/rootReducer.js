// @flow

import {combineReducers} from 'redux';

import loginReducer from './screens/Login/loginReducer';

export default combineReducers({auth: loginReducer});
