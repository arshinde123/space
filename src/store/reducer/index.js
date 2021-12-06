import { combineReducers } from 'redux';
import entitiesReducer from './entities';
import authorizationReducer from './authorization';

export default combineReducers({
    entities: entitiesReducer,
    authorization: authorizationReducer,
});
