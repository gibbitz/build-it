import {combineReducers}  from 'redux';
import { routerReducer } from 'react-router-redux';
import week from './week';
import day from './day';

const rootReducer = combineReducers({
  routing: routerReducer,
  week,
  day
});

export default rootReducer;
