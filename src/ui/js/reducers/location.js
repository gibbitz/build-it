import {
  LOCATION_BASE,
  LOCATION_CACHED,
  LOCATION_SUCCESS
} from '../actions';

const locationReducer = (state = {}, action) => {
  let output = {},
      {payload, type} = action;

  switch(type) {

    case LOCATION_CACHED:
      output = { ...state, ...payload};
    break;

    default:
      output = state;
    break;
  }

  return output;
};

export default locationReducer;
