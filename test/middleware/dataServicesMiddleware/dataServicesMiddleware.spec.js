/* globals expect jasmine */

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import { mockLocationResult, mockForcastResult } from '../../constants/mocks';

import {createDataRequest} from '../../../src/ui/js/actions/creators';
import {
  DATA_REQUEST,
  DATA_SUCCESS,
  LOCATION_SUCCESS
} from '../../../src/ui/js/actions';
import { dataServicesMiddleware } from '../../../src/ui/js/middleware/dataServicesMiddleware';

const middlewares = [thunk, dataServicesMiddleware],
      mockStore = configureMockStore(middlewares);

// Would be better to create a testing framework for redux stores that can exit
// when a specific action is dispatched. (subscribe to dispatches like a reducer
// or middleware) Then an action could be dispatched and the mockstore could be
// watched until a specific action is dispatched or a timeout interval set in the
// test params...
// Me no likey adding callbacks just for testing (but not more than wrapping
// all dispatches with thunk tho...)

describe('dataServicesMiddleware', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('dispatches DATA_REQUEST then LOCATION_SUCCESS then finally DATA_SUCCESS', (_done) => {
    nock('https://ipinfo.io/')
      .get('/json')
      .reply(200, mockLocationResult);

    nock('http://api.openweathermap.org/')
      .get('/data/2.5/forecast')
      .query({
        APPID:'dcc57a895eb36d221920f604b0cb8aca',
        units:'imperial',
        lat:'lat',
        lon:'lon'
      })
      .reply(200, mockForcastResult);

    const store = mockStore(),
          testCallback = ()=> {
            let actions = store.getActions();
            expect(actions[0].type).toEqual(DATA_REQUEST);
            expect(actions[1].type).toEqual(LOCATION_SUCCESS);
            expect(actions[1].payload).toEqual(mockLocationResult);
            expect(actions[2].type).toEqual(DATA_SUCCESS);
            expect(actions[2].payload).toEqual(mockForcastResult);
            _done();
          };

    store.dispatch(createDataRequest(testCallback));
  })
})
