import { combineReducers } from 'redux';
import tokenReducer from '../authorization/token';

export default combineReducers({
    token: tokenReducer,
});
