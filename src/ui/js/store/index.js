import { createStore } from 'redux';
import rootReducer  from '../reducers';
import rootMiddleware from '../middleware';

export default function configureStore(_initialState) {
    return createStore(
      rootReducer,
      _initialState,
      rootMiddleware
    );
}
