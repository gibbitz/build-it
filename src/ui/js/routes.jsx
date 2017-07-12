import React from 'react';
import {Route, IndexRoute} from 'react-router';
import * as routes from './constants/routing.js';
import WeatherWrapperView from './views/WeatherWrapperView.jsx';
import StatsView from './views/StatsView.jsx';
import DayView from './views/DayView.jsx';
import WeekView from './views/WeekView.jsx';

export default (_store) => {
  return(
    <Route path="/" component={WeatherWrapperView}>
      <IndexRoute
        component={WeekView}
      />
      <Route
        path={routes.DAY_ROUTE}
        component={DayView}
      >
        <Route
          path={routes.STATS_ROUTE}
          component={StatsView}
        />
      </Route>
    </Route>
  );
};
