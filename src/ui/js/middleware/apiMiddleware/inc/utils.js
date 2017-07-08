// create query params from object
export const setLocationQuery = (_object) => {
  return "?" + Object.keys(_object).map( (key)=>{
    return key + '=' + _object[key];
  }).join('&');
};

// shorthand to grab parsed payload body from response
export const returnResponseBody = (_response) => {
  return _response.body;
};
