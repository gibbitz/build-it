/* globals expect */

import * as filters from '../../../src/ui/js/middleware/applicationCacheMiddleware/filters';

describe('locationFilter', () => {
  it('should strip hostname, ip, and org from location data', () => {
    const input = {
      hostname: 'hostname',
      ip: 'ip',
      org: 'org',
      keeper: 'keeper'
    },
    expectedOutput = {
      keeper: 'keeper'
    };

    expect(filters.locationFilter(input)).toEqual(expectedOutput);
  });
});

describe('forecastFilter', () => {
  it('should create an object with `dt_txt` values from `list`as keys', () => {
    const input = {
      list: [
        {
          dt_txt: 'Wed Jul 12 2017 08:46:17 GMT-0400 (EDT)',
          main: {
            temp: 'temperature-1',
            humidity: 'humidity-1'
          },
          weather: [
            {
              icon: 'icon-1',
              id: 'id-1',
              description: 'description-1'
            }
          ],
          dreck: 'dreck-1'
        },
        {
          dt_txt: 'Tue Jul 11 2017 08:46:17 GMT-0400 (EDT)',
          main: {
            temp: 'temperature-2',
            humidity: 'humidity-2'
          },
          weather: [
            {
              icon: 'icon-2',
              id: 'id-2',
              description: 'description-2'
            }
          ],
          dreck: 'dreck-2'
        },
        {
          dt_txt: 'Tue Jul 11 2017 08:46:17 GMT-0400 (EDT)',
          main: {
            temp: 'temperature-2',
            humidity: 'humidity-2'
          },
          weather: [
            {
              icon: 'icon-2',
              id: 'id-2',
              description: 'description-2'
            }
          ],
          dreck: 'dreck-2'
        }
      ]
    },
    expectedOutput = {
      'Wed':[
        {
          dateStr: 'Wed Jul 12 2017 08:46:17 GMT-0400 (EDT)',
          date: 'Wednesday, July 12',
          time: '8:46 AM',
          temperature: 'temperature-1',
          humidity: 'humidity-1',
          weather: {
            icon: 'owf owf-id-1 owf-3x',
            iconImage: 'http://openweathermap.org/img/w/icon-1.png',
            id: 'id-1',
            text: 'description-1'
          }
        },
      ],
      'Tue':[
        {
          dateStr: 'Tue Jul 11 2017 08:46:17 GMT-0400 (EDT)',
          date: 'Tuesday, July 11',
          time: '8:46 AM',
          temperature: 'temperature-2',
          humidity: 'humidity-2',
          weather: {
            icon: 'owf owf-id-2 owf-3x',
            iconImage: 'http://openweathermap.org/img/w/icon-2.png',
            id: 'id-2',
            text: 'description-2'
          }
        },
        {
          dateStr: 'Tue Jul 11 2017 08:46:17 GMT-0400 (EDT)',
          date: 'Tuesday, July 11',
          time: '8:46 AM',
          temperature: 'temperature-2',
          humidity: 'humidity-2',
          weather: {
            icon: 'owf owf-id-2 owf-3x',
            iconImage: 'http://openweathermap.org/img/w/icon-2.png',
            id: 'id-2',
            text: 'description-2'
          }
        }
      ]
    };

    expect(filters.forecastFilter(input)).toEqual(expectedOutput);
  });
});
