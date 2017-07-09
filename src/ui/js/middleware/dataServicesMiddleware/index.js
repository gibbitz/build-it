import { DATA_REQUEST, DATA_SUCCESS, DATA_BASE, LOCATION_BASE } from '../../actions';
import { API_SERVICES } from '../../constants';
import RequestCreator from './RequestCreator';

export const dataServicesMiddleware = _store => _next => _action => {
  let dispatch = _store.dispatch;


  switch (_action.type) {
    case DATA_REQUEST:
      RequestCreator.makeRequest(
        dispatch,
        LOCATION_BASE,
        API_SERVICES.LOCATION.endpoint,
        {
          ...API_SERVICES.LOCATION.requestDefaults,
          method: 'GET',
        }
      )
      .then((_response)=>{
        let dispatch = _store.dispatch;

        return RequestCreator.makeRequest(
          dispatch,
          DATA_BASE,
          API_SERVICES.FORECAST.endpoint,
          {
            ...API_SERVICES.FORECAST.requestDefaults,
            method: 'GET',
            query: {
              ...API_SERVICES.FORECAST.requestDefaults.query,
              zip: _response.postal
            }
          }
        );
      });
    break;
    default:
    break;
  }
  // this middleware only produces side effects. Passing action through...
  return _next(_action);
};
