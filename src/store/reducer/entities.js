import { combineReducers } from 'redux';
import planetsReducer from '../entities/planets';
import vehiclesReducer from '../entities/vehicles';
import searchPlanetReducer from '../entities/searchPlanet';
import timeReducer from '../entities/time';

export default combineReducers({
    planets: planetsReducer,
    vehicles: vehiclesReducer,
    searchPlanet: searchPlanetReducer,
    time: timeReducer,
});
