import {
  SHOW_WEEK
} from '../actions';

const dayReducer = (state = {}, action) => {
  let output = {},
      {payload, type} = action;

  switch(type) {

    case SHOW_WEEK:
      output = { ...state, ...payload};
    break;

    default:
      output = state;
    break;
  }

  return output;
};

export default dayReducer;
