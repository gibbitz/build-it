/* eslint-disable no-console */

import {
  DEFAULT_REQUEST_INFO,
  STATUSES,
  LOADING_MESSAGES
} from "./constants";

import {setLocationQuery, returnResponseBody} from './utils';

import * as actionTypes from "../actions";

// superagent is commonjs for nodejs (not es6, yet) thus the require()
const request = require('superagent');

// returns a function that dispatches success actions
const createSuccessDispatchers = (_name, _dispatch) => {
  return (_response) => {

    // SUCCESS dispatched to allow other middleware to modify state and reducers to update
    _dispatch({
      type: actionTypes[_name + actionTypes.SUCCESS] || _name + actionTypes.SUCCESS,
      payload:  _response.results || _response,
      pagination: _response.pagination || null
    });
    // POST_SUCCESS dispatched after state is updated -- for redirection or ui related dispatchers
    _dispatch({
      type: actionTypes[_name + actionTypes.POST_SUCCESS] || _name + actionTypes.POST_SUCCESS,
      payload: _response.results || _response,
      pagination: _response.pagination || null
    });
    // return _response for use in caller of makeRequest(s)()
    return _response;
  };
};

// DRY for handling errors
const createRejectionHandler = (_name, _dispatch) => {
  return (_error) => {
    // FAIL can be caused by network or logic failure.
    // If no status is present in _error it is a script error.
    // The object is warned below for stack access
    let expectedError = STATUSES[_name] && _error.status;
    _dispatch({
      type: actionTypes[_name + actionTypes.ERROR],
      payload: {
        status: _error.status || STATUSES.REDUX["206"],
        statusText: expectedError ? STATUSES[_name][_error.status] : _error.toString()
      }
    });
    // console.warn any unexpected errors for debugging
    if( !expectedError ){
      console.warn(_error);
    }
  };
};

// core helper to make API request: returns Promise.
const basicRequest = ( _endpoint, _request, _cachedData ) => {
  let method = _request.method && request[ _request.method.toLowerCase() ] ?
    _request.method.toLowerCase() : 'get';

  if( _cachedData ){
    return Promise.resolve( _cachedData );
  }

  // append querystring if needed
  let assembleEndpointURL = ()=>{
    let output = _endpoint;
    if(_request.query){
      output += setLocationQuery(_request.query);
    }
    return output;
  };
console.log(...{
      ...DEFAULT_REQUEST_INFO.headers,
      ..._request.headers
    });
  // superagent request
  return new Promise ((_resolve, _reject)=>{
    request[method]( _endpoint )
    .redirects(5) // default, but here to show a) that it is considered and b) to change if needed
    .query(_request.query)
    .set({
      ...DEFAULT_REQUEST_INFO.headers,
      ..._request.headers
    })
    .send( _request.body )
    .then( returnResponseBody ) //to return reponse.body object since we don't need request details ...
    .then( (_response) => {
      return _resolve( Promise.resolve(_response) );
    })
    .catch( (_err) => {
      return _reject( _err );
    });
  });
};

class ApiCaller {
  static makeRequest( _dispatch, _name="NETWORK", _endpoint, _request, _cachedData ){
    return basicRequest( _endpoint, _request, _cachedData )
      .then( createSuccessDispatchers(_name, _dispatch) )
      .catch( createRejectionHandler(_name, _dispatch) )
      .then((_response) => {
        // always called nothing here yet...
        return _response;
      });
  }

  static makeRequests(_dispatch, _batchName="NETWORK", ..._requests){
    let promises = [];

    for (let i=0; i<_requests.length; i++){
      promises.push( ApiCaller.makeRequest( _dispatch, ..._requests[i] ) );
    }

    return Promise.all(promises)
      .then( createSuccessDispatchers(_batchName, _dispatch) )
      .catch( createRejectionHandler(_batchName, _dispatch) )
      .then((_response) => {
        // always called nothing here yet...
        return _response;
      });
  }
}

export default ApiCaller;
