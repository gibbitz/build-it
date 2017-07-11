/* globals expect */

import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
// import configureStore from 'redux-mock-store';

import configureStore from '../../src/ui/js/store';

import WeatherWrapperView from '../../src/ui/js/views/WeatherWrapperView.jsx';

describe('*** WeatherWrapperView: Render Test',()=>{
    const town = 'Anywhere USA',
          state = 'Denial',
          country = 'USA';

    let wrapper,
        store = configureStore({
            location: {
                city: town,
                region: state,
                country: country
            }
        });


    beforeEach(()=>{
        wrapper = mount(
            <Provider store={store}>
                <WeatherWrapperView />
            </Provider>
        );

    });

    it('+++ render the component', () => {
       expect(wrapper.find(WeatherWrapperView).length).toEqual(1);
    });

    it('+++ features town', () => {
        expect(wrapper.find('header h1').text()).toEqual(town);
    });

    it('+++ contains state and country', () => {
        expect(wrapper.find('header h2').text()).toContain(state);
        expect(wrapper.find('header h2').text()).toContain(country);
    });

});


