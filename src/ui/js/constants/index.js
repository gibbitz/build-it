
export const API_DEFAULT_STATUS_MESSAGES = {
  "401" : "You do not have access to this data.",
  "403" : "You do not have access to this data.",
  "404" : "The API endpoint could not be found.",
  "500" : "A server error occurred.",
  "206" : "There was a problem interpreting the response."
};

export const DEFAULT_REQUEST_INFO = {
  method: 'GET',
  headers: {
    // Empty to avoid preflight CORS requests.
  }
};

export const API_SERVICES = {
  LOCATION: {
    endpoint: 'https://ipinfo.io/json',
    statuses: {
      ...API_DEFAULT_STATUS_MESSAGES
    },
    requestDefaults: {
      ...DEFAULT_REQUEST_INFO
    },
    loadingMessage: 'Marco...   Polo'
  },
  FORECAST: {
    endpoint: 'http://api.openweathermap.org/data/2.5/forecast',
    statuses: {
      ...API_DEFAULT_STATUS_MESSAGES
    },
    requestDefaults: {
      ...DEFAULT_REQUEST_INFO,
      query: {
        APPID: 'dcc57a895eb36d221920f604b0cb8aca'
      }
    },
    loadingMessage: 'Checking the morning sky...'
  }
};
