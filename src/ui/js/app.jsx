import React from 'react';
import {render} from 'react-dom';
import configureStore from './store';
import {Provider} from 'react-redux';
import { Router, hashHistory, browserHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes.jsx';

import '../scss/main.scss';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

render(
  (
    <Provider store={store}>
      <Router history={history} routes={routes(store)} />
    </Provider>
  ),
  document.getElementById('app')
);
