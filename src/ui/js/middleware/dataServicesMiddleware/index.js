import { DATA_REQUEST, DATA_SUCCESS, DATA_BASE, LOCATION_BASE } from '../../actions';
import { API_SERVICES } from '../../constants';
import RequestCreator from './RequestCreator';

let testDataCallback = ()=>{};

export const dataServicesMiddleware = _store => _next => _action => {
  let dispatch = _store.dispatch;

  testDataCallback = _action.callback ? _action.callback : testDataCallback;

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
              lat: _response.loc.split(',')[0],
              lon: _response.loc.split(',')[1]
            }
          }
        );
      })
      // lazy way out. Should update messaging to draw a modal,
      // but didn't flesh out messaging due to time...
      // This is here due to errors running on command line.
      .catch((_err)=>{
        console.warn(_err);
      })
      .then(()=>{
        testDataCallback();
      });
    break;
    default:
    break;
  }
  // this middleware only produces side effects. Passing action through...
  return _next(_action);
};
