export const apiKeys = {
  LOCATION: '',
  FORECAST: 'dcc57a895eb36d221920f604b0cb8aca',
};

export const endpoints = {
  LOCATION: 'https://ipinfo.io/json',
  FORECAST: 'http://api.openweathermap.org/data/2.5/forecast',
};

const defaultStatus = {
  "401" : "You do not have access to this data.",
  "403" : "You do not have access to this data.",
  "404" : "The API endpoint could not be found.",
  "500" : "A server error occurred."
};

export const STATUSES = {
  NETWORK: {
    ...defaultStatus
  },
  LOCATION: {
    ...defaultStatus
  },
  FORECAST: {
    ...defaultStatus
  },
  REDUX: {
    ...defaultStatus,
    "206" : "There was a problem interpreting the response."
  }
};

export const LOADING_MESSAGES = {
  LOCATION: 'Marco...   Polo',
  FORECAST: 'Checking the morning sky...',
  NETWORK: "Loading..."
};

export const DEFAULT_REQUEST_INFO = {
  method: 'GET',
  headers: {
    // Empty to avoid preflight CORS requests.
  }
};


