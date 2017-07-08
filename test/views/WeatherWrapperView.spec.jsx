import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

import WeatherWrapperView from '../../src/ui/js/views/WeatherWrapperView.jsx';


describe('*** WeatherWrapperView: Render Test',()=>{
    let wrapper;

    const output = 10;

    beforeEach(()=>{
        wrapper = shallow(<article className="weather-wrapper"/>);

    });

    it('+++ render the component', () => {
       expect(wrapper.length).toEqual(1);
    });

    it('+++ contains output', () => {
        expect(wrapper.find('input[placeholder="Output"]').prop('value')).toEqual(output);
    });

});
