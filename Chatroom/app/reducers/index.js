import { combineReducers } from 'redux';
import loginReducer from './LoginReducer';
import signupReducer from './SignupReducer';


export default combineReducers({
    login : loginReducer,
    signup : signupReducer
});
