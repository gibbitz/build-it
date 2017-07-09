import {
  DATA_REQUEST,
  SHOW_WEEK,
  SHOW_DAY,
  SHOW_STATS,
  PREFIX,
  CACHED
} from '../actions';

export const createDataRequest = () => {
  return {
    type: DATA_REQUEST,
    payload:{}
  };
};

export const createShowWeekAction = () => {
  return {
    type: SHOW_WEEK,
    payload:{}
  };
};

export const createShowDayAction = (_dayKey) => {
  return {
    type: SHOW_DAY,
    payload:_dayKey
  };
};

export const createShowStatsAction = (_dayKey) => {
  return {
    type: SHOW_STATS,
    payload:_dayKey
  };
};

export const createCachedAction = (_baseName, _cachePayload) => {
  return {
    type: (_baseName.match(PREFIX) ? _baseName : PREFIX + _baseName) + CACHED,
    payload: _cachePayload
  };
};
