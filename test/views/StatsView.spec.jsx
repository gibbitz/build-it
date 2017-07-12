/* globals expect */

import React from 'react';
import PropTypes from 'prop-types';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {Link} from 'react-router';
// import configureStore from 'redux-mock-store';

import configureStore from '../../src/ui/js/store';

import StatsView from '../../src/ui/js/views/StatsView.jsx';

describe('*** StatsView: Render Test',()=>{
    const weatherObj = {
            icon: 'icon',
            text: 'text',
         },
         baseHourObject = {
            weather: {
                ...weatherObj
            },
            temperature: 0,
            humidity: 1,
            time: 'time'
        },
        params = {
            day: 'day'
        };

    let wrapper,
        store = configureStore({
            stats: {
                a: baseHourObject,
                b: baseHourObject,
                c: baseHourObject,
                d: baseHourObject,
                e: {
                    ...baseHourObject,
                    testProp: 2
                }

            }
        }),
        hourCount = Object.keys(store.getState().stats).length;


    beforeEach(()=>{
        wrapper = mount(
            <Provider store={store}>
                <StatsView params={params}/>
            </Provider>,
            {
                context: { store },
                childContextTypes: { store: PropTypes.object.isRequired }
            }
        );

    });

    it('+++ render the component', () => {
        expect(wrapper.find(StatsView).length).toEqual(1);
    });

    it('+++ renders each hour block', () => {
        expect(wrapper.find(StatsView).find('li').length).toEqual(hourCount);
    });

    it('+++ contains flat props from state', () => {
        let firstItem = wrapper.find(StatsView).find('li').first();
        expect(firstItem.find('div').first().text()).toContain(baseHourObject.temperature);
        expect(firstItem.find('div').first().text()).toContain(baseHourObject.humidity);
        expect(firstItem.find('h2').first().text()).toEqual(baseHourObject.time);
    });

    it('+++ contains nested props from state', () => {
        let firstIcon = wrapper.find(StatsView).find('li').first().find('i');
        expect(firstIcon.prop('title')).toEqual(weatherObj.text);
        expect(firstIcon.prop('className')).toContain(weatherObj.icon);
    });

});


