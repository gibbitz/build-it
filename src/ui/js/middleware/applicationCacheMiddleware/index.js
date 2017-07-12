import {
  DATA_BASE,
  DATA_SUCCESS,
  DATA_CACHED,
  LOCATION_BASE,
  LOCATION_SUCCESS,
  SHOW_WEEK,
  SHOW_DAY,
  SHOW_STATS
} from '../../actions';

import {
  createCachedAction,
  createShowWeekAction
} from '../../actions/creators';

import { locationFilter, forecastFilter } from './filters';

import ApplicationCache from './ApplicationCache';

export default ApplicationCache;

export const applicationCacheMiddleware = _store => _next => _action => {
  let dispatch = _store.dispatch,
      conditionalStateUpdate = (_cacheObject, _newPayload) => {
        let existingCache = ApplicationCache.data && ApplicationCache.data.pending ?
          ApplicationCache.data.pending : [];
        if(!_cacheObject){
          ApplicationCache.data = { pending: [ ...existingCache, {..._action}] };
          return {};
        }else{
          return _newPayload;
        }
      };


  switch (_action.type) {
    case LOCATION_SUCCESS:
      ApplicationCache.data = {
        LOCATION: {
          ...locationFilter(_action.payload)
        }
      };
      dispatch(createCachedAction(LOCATION_BASE, ApplicationCache.get('LOCATION')));
    break;
    case DATA_SUCCESS:
      ApplicationCache.data = {
        FORECAST: {
          ...forecastFilter(_action.payload)
        }
      };
      dispatch(createCachedAction(DATA_BASE));
    break;
    case DATA_CACHED:
      dispatch(createShowWeekAction());
      // if state updates were requested while loading...
      if(ApplicationCache.get('pending')){
          ApplicationCache.get('pending').map((_cachedAction, _index)=>{
            Promise.resolve(_cachedAction).then((_action) => {dispatch(_action);});
          });
          ApplicationCache.data.pending = false;
      }
    break;
    case SHOW_WEEK:
      _action.payload = ApplicationCache.get('FORECAST');
    break;
    case SHOW_DAY:
    case SHOW_STATS:
      _action.payload = conditionalStateUpdate(
        ApplicationCache.data.FORECAST,
        ApplicationCache.get('FORECAST.' + _action.payload)
      );
    break;
    default:
    break;
  }
  // this middleware only produces side effects. Passing action through...
  return _next(_action);
};
