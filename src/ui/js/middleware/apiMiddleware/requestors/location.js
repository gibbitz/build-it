import { LOCATION_BASE } from '../actions';
import { endpoints } from '../inc/constants';
import ApiCaller from '../inc/ApiCaller';

export const requestLocation = (_store, _next, _action) => {
  let dispatch = _store.dispatch;

  return ApiCaller.makeRequest(
    dispatch,
    LOCATION_BASE,
    endpoints.LOCATION,
    {
      method: 'GET'
    }
  );
};
