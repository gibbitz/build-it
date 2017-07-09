import { applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory} from 'react-router';

import { dataServicesMiddleware } from './dataServicesMiddleware';
import { applicationCacheMiddleware } from './applicationCacheMiddleware';

const composeWithDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // UR config here
  }) : compose;

const rootMiddleware = composeWithDevTools(
  applyMiddleware(
    routerMiddleware(browserHistory),
    dataServicesMiddleware,
    applicationCacheMiddleware
  )
);

export default rootMiddleware;
