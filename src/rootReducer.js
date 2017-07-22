import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import HomeReducer from './components/home/reducer';

const rootReducer = combineReducers({
  router: routerReducer,
  HomeReducer
});

export default rootReducer;
