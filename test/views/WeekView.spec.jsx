/* globals expect */

import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
// import configureStore from 'redux-mock-store';

import configureStore from '../../src/ui/js/store';

import WeekView from '../../src/ui/js/views/WeekView.jsx';
import DailyBlockView from '../../src/ui/js/views/components/DailyBlockView.jsx';

describe('*** WeekView: Render Test',()=>{
    const weatherObj = {
            icon: 'icon',
            iconImage: 'iconImage',
            text: 'text',
         },
         baseHourObject = {
            testProp: 1,
            weather: {
                ...weatherObj
            },
            temperature: 0,
            date: 'date',
            linkKey: 'linkKey'
        };

    let wrapper,
        store = configureStore({
            week: {
                'dayOne': [
                    baseHourObject
                ],
                'dayTwo': [
                    baseHourObject,
                    baseHourObject,
                    baseHourObject,
                    baseHourObject,
                    {
                        ...baseHourObject,
                        testProp: 2
                    }
                ]
            }
        }),
        dayCount = Object.keys(store.getState().week).length;


    beforeEach(()=>{
        wrapper = mount(
            <Provider store={store}>
                <WeekView />
            </Provider>
        );

    });

    it('+++ render the component', () => {
        expect(wrapper.find(WeekView).length).toEqual(1);
    });

    it('+++ proper number of days rendered', () => {
        expect(wrapper.find(DailyBlockView).length).toEqual(dayCount);
    });

    it('+++ proper props passed to DailyBlockView(s)', () => {
        expect(wrapper.find('DailyBlockView').first().prop('testProp')).toEqual(1);
        expect(wrapper.find('DailyBlockView').first().prop('linkKey')).toEqual('linkKey');
        expect(wrapper.find('DailyBlockView').first().prop('date')).toEqual('date');
        expect(wrapper.find('DailyBlockView').first().prop('temperature')).toEqual(0);
        expect(wrapper.find('DailyBlockView').first().prop('weather')).toEqual(weatherObj);
    });

    it('+++ proper hourly index used by DailyBlockView(s)', () => {
        expect(wrapper.find('DailyBlockView').last().prop('testProp')).toEqual(2);
    });

});


