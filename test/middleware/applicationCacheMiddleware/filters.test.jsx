/* globals expect */

import * as filters from '../../../src/ui/js/middleware/applicationCacheMiddleware/filters';
import { mockLocationResult, mockFilteredLocation, mockForcastResult, mockFilteredForcast } from '../../constants/mocks';

describe('locationFilter', () => {
  it('should strip hostname, ip, and org from location data', () => {
    expect(filters.locationFilter(mockLocationResult)).toEqual(mockFilteredLocation);
  });
});

describe('forecastFilter', () => {
  it('should create an object with `dt_txt` values from `list`as keys', () => {
    expect(filters.forecastFilter(mockForcastResult)).toEqual(mockFilteredForcast);
  });
});
