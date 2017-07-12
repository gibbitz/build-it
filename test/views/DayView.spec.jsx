/* globals expect */

import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Link} from 'react-router';
// import configureStore from 'redux-mock-store';

import configureStore from '../../src/ui/js/store';

import DayView from '../../src/ui/js/views/DayView.jsx';

describe('*** DayView: Render Test',()=>{
    const weatherObj = {
            icon: 'icon',
            text: 'text',
         },
         baseHourObject = {
            weather: {
                ...weatherObj
            },
            temperature: 0,
            date: 'date'
        },
        params = {
            day: 'day'
        };

    let wrapper,
        store = configureStore({
            day: [
                baseHourObject,
                baseHourObject,
                baseHourObject,
                baseHourObject,
                {
                    ...baseHourObject,
                    testProp: 2
                }
            ]
        });


    beforeEach(()=>{
        wrapper = mount(
            <Provider store={store}>
                <DayView params={params}/>
            </Provider>
        );

    });

    it('+++ render the component', () => {
        expect(wrapper.find(DayView).length).toEqual(1);
    });

    it('+++ contains props', () => {
        expect(wrapper.find(Link).last().prop('to')).toContain(params.day);
    });

    it('+++ contains flat props from state', () => {
        expect(wrapper.find('.day-view__weather').text()).toContain(baseHourObject.temperature);
        expect(wrapper.find('h2').text()).toEqual(baseHourObject.date);
    });

    it('+++ contains nested props from state', () => {
        expect(wrapper.find('i').prop('title')).toContain(weatherObj.text);
        expect(wrapper.find('i').prop('className')).toContain(weatherObj.icon);
    });

});


