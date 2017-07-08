import { LOCATION_REQUEST } from '../middleware/apiMiddleware/actions';

export const createLocationRequest = () => {
  return {
    type: LOCATION_REQUEST,
    payload:{}
  };
};
