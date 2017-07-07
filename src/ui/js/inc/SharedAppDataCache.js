const q = require('simple-object-query'); // commonJS module only :(

let instance = null,
    cache;

class SharedAppDataCache{
  constructor(_props) {
    if(!instance){
      instance = this;
    }

    cache = _props || {};

    return instance;
  }

  set data(_data) {
    cache = cache ? { ...cache, ..._data } : _data;
  }

  get data(){
    return cache;
  }

  // POC. create lookups against this to grab specific data from appSharedData
  getCategory(_categoryName){
    return q.get(cache, _categoryName + '[*]');
  }

  // or use the simple-query-object API directly
  // https://github.com/redexp/simple-object-query

  find(_queryObject){ // queryObject is an object that resembles array object shape/key/value desired in the result
    return q.find(cache, _queryObject);
  }

  search(_queryObject, _excludes, _callback, _recursion = true){
    let callParams = {
          source: cache,
          query: _queryObject, // same object as for "find"
          exclude: _excludes, // array of names of properties which are links to other objects in source (circular links)
          recursion: _recursion, // deep search or not
          callback: _callback // function (object) {} -- optional callback for each found target
        };
    return q.search(callParams);
  }

  get(_queryPathPattern){
    return q.get(cache, _queryPathPattern);
  }

  where(_category, _queryObject){
    return q.where(cache[_category], _queryObject);
  }

}

export default new SharedAppDataCache();
