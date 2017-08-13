import { combineReducers } from 'redux';
import loginReducer from './LoginReducer';
import signupReducer from './SignupReducer';
import homeReducer from './HomeReducer';


export default combineReducers({
    login : loginReducer,
    signup : signupReducer,
    home : homeReducer
});
