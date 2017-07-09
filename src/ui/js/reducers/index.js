import {combineReducers}  from 'redux';
import { routerReducer } from 'react-router-redux';
import week from './week';
import day from './day';
import stats from './stats';
import location from './location';

const rootReducer = combineReducers({
  routing: routerReducer,
  location,
  week,
  day,
  stats
});

export default rootReducer;
