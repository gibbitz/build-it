export const mockLocationResult = {
  ip: 'ip',
  hostname: 'hostname',
  city: 'city',
  region: 'region',
  country: 'country',
  loc: 'lat,lon',
  org: 'org',
  postal: 'postal'
};

export const mockFilteredLocation = {
  city: 'city',
  region: 'region',
  country: 'country',
  loc: 'lat,lon',
  postal: 'postal'
};

export const mockForcastResult = {
  message: 'message',
  list: [
    {
      dt: 1499914800,
      main: {
        temp: 'temp',
        temp_min: 'temp_min',
        temp_max: 'temp_max',
        pressure: 'pressure',
        sea_level: 'sea_level',
        grnd_level: 'grnd_level',
        humidity: 'humidity',
        temp_kf: 'temp_kf'
      },
      weather: [
        {
           id: 'id',
           main: 'main',
           description: 'description',
           icon: 'icon',
        }
      ],
      dt_txt: '2017-07-12 03:00:00'
    },{
      dt: 1499914800,
      main: {
        temp: 'temp',
        temp_min: 'temp_min',
        temp_max: 'temp_max',
        pressure: 'pressure',
        sea_level: 'sea_level',
        grnd_level: 'grnd_level',
        humidity: 'humidity',
        temp_kf: 'temp_kf'
      },
      weather: [
        {
           id: 'id',
           main: 'main',
           description: 'description',
           icon: 'icon',
        }
      ],
      dt_txt: '2017-07-13 03:00:00'
    }, {
      dt: 1499914800,
      main: {
        temp: 'temp',
        temp_min: 'temp_min',
        temp_max: 'temp_max',
        pressure: 'pressure',
        sea_level: 'sea_level',
        grnd_level: 'grnd_level',
        humidity: 'humidity',
        temp_kf: 'temp_kf'
      },
      weather: [
        {
           id: 'id',
           main: 'main',
           description: 'description',
           icon: 'icon',
        }
      ],
      dt_txt: '2017-07-13 06:00:00'
    }
  ],
  city: {
    id: 'id',
    name: 'name',
    coord: {
      lat: 'lat',
      lon: 'lon'
    },
    country: 'country',
    population: 'population'
  }
};

export const mockFilteredForcast = {
  '2017-07-12':[
    {
      dateStr: '2017-07-12 03:00:00',
      date: 'Wednesday, July 12',
      time: '3:00 AM',
      temperature: 'temp',
      humidity: 'humidity',
      weather: {
        icon: 'owf owf-id owf-3x',
        iconImage: 'http://openweathermap.org/img/w/icon.png',
        id: 'id',
        text: 'description'
      }
    },
  ],
  '2017-07-13':[
    {
      dateStr: '2017-07-13 03:00:00',
      date: 'Thursday, July 13',
      time: '3:00 AM',
      temperature: 'temp',
      humidity: 'humidity',
      weather: {
        icon: 'owf owf-id owf-3x',
        iconImage: 'http://openweathermap.org/img/w/icon.png',
        id: 'id',
        text: 'description'
      }
    },
    {
      dateStr: '2017-07-13 06:00:00',
      date: 'Thursday, July 13',
      time: '6:00 AM',
      temperature: 'temp',
      humidity: 'humidity',
      weather: {
        icon: 'owf owf-id owf-3x',
        iconImage: 'http://openweathermap.org/img/w/icon.png',
        id: 'id',
        text: 'description'
      }
    }
  ]
};
