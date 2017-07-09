import {
  SHOW_DAY,
  SHOW_STATS
} from '../actions';

const dayReducer = (state = {}, action) => {
  let output = {},
      {payload, type} = action;

  switch(type) {

    case SHOW_DAY:
      output = { ...state, ...payload};
    break;

    case SHOW_STATS:
      output = { ...state, ...payload};
    break;

    default:
      output = state;
    break;
  }

  return output;
};

export default dayReducer;
