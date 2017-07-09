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
  let dispatch = _store.dispatch;


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
    break;
    case SHOW_WEEK:
      _action.payload = ApplicationCache.get('FORECAST');
    break;
    case SHOW_DAY:
      _action.payload = ApplicationCache.get('FORECAST.' + _action.payload);
    break;
    case SHOW_STATS:
      // in case I decide to change the state, prolly yagni
      _action.payload = ApplicationCache.get('FORECAST.' + _action.payload);
    break;
    default:
    break;
  }
  // this middleware only produces side effects. Passing action through...
  return _next(_action);
};
