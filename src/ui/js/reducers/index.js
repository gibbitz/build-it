import {combineReducers}  from 'redux';
import { routerReducer } from 'react-router-redux';
import week from './week';
import day from './day';
import location from './location';

const rootReducer = combineReducers({
  routing: routerReducer,
  location,
  week,
  day
});

export default rootReducer;
