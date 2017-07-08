import { FORECAST_BASE } from '../actions';
import { endpoints, apiKeys, DEFAULT_REQUEST_INFO } from '../inc/constants';
import ApiCaller from '../inc/ApiCaller';

export const requestForecast = (_store, _next, _action) => {
  let dispatch = _store.dispatch;

  return ApiCaller.makeRequest(
    dispatch,
    FORECAST_BASE,
    endpoints.FORECAST,
    {
      method: 'GET',
      query: {
        zip: _action.payload.postal,
        APPID: apiKeys.FORECAST
      }
    }
  );
};
