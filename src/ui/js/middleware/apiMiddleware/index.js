import { LOCATION_REQUEST, LOCATION_SUCCESS, FORECAST_REQUEST } from './actions';
import { requestLocation } from './requestors/location';
import { requestForecast } from './requestors/forecast';

export const apiMiddleware = store => next => action => {
  let requestInfo = {};
  let dispatch = store.dispatch;


  switch (action.type) {
    case LOCATION_REQUEST:
      requestLocation(store, next, action);
    break;

    case LOCATION_SUCCESS:
      requestForecast(store, next, action);
    break;

    case FORECAST_REQUEST:
      requestForecast(store, next, action);
    break;

    default:

    break;
  }
  // this middleware only produces side effects. Passing action through...
  return next(action);
};
