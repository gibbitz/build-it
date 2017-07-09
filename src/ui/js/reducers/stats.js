import {
  SHOW_STATS
} from '../actions';

const statsReducer = (state = {}, action) => {
  let output = {},
      {payload, type} = action;

  switch(type) {

    case SHOW_STATS:
      output = { ...state, ...payload};
    break;

    default:
      output = state;
    break;
  }

  return output;
};

export default statsReducer;
