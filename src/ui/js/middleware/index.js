import { browserHistory} from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import { applyMiddleware, compose } from 'redux';

const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // UR config here
  }) : compose;

const rootMiddleware = composeWithDevTools(
  applyMiddleware(
    routerMiddleware(browserHistory)
  )
);

export default rootMiddleware;
