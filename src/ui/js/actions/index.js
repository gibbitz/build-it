// API BASIC TYPES
export const PREFIX = "@@_gibbitz_";
export const REQUEST = "_REQUEST";
export const LOADING = "_LOADING";
export const SUCCESS = "_SUCCESS";
export const ERROR = "_ERROR";
export const CLOSE = "_CLOSE";
export const CACHED = "_CACHED";

// LOCATION
export const LOCATION_BASE = PREFIX + "LOCATION";
export const LOCATION_REQUEST = LOCATION_BASE + REQUEST;
export const LOCATION_LOADING = LOCATION_BASE + LOADING;
export const LOCATION_SUCCESS = LOCATION_BASE + SUCCESS;
export const LOCATION_ERROR = LOCATION_BASE + ERROR;
export const LOCATION_CLOSE = LOCATION_BASE + CLOSE;
export const LOCATION_CACHED = LOCATION_BASE + CACHED;

// DATA
export const DATA_BASE = PREFIX + "DATA";
export const DATA_REQUEST = DATA_BASE + REQUEST;
export const DATA_LOADING = DATA_BASE + LOADING;
export const DATA_SUCCESS = DATA_BASE + SUCCESS;
export const DATA_ERROR = DATA_BASE + ERROR;
export const DATA_CLOSE = DATA_BASE + CLOSE;
export const DATA_CACHED = DATA_BASE + CACHED;

// APPLICATION DATA
export const SHOW_WEEK = PREFIX + 'SHOW_WEEK';
export const SHOW_DAY = PREFIX + 'SHOW_DAY';
export const SHOW_STATS = PREFIX + 'SHOW_STATS';
