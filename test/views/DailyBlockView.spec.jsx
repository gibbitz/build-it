/* globals expect */

import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {Link} from 'react-router';
import {createStore} from 'redux';
// import configureStore from 'redux-mock-store';

import configureStore from '../../src/ui/js/store';

import {DailyBlockView} from '../../src/ui/js/views/components/DailyBlockView.jsx';

describe('*** DailyBlockView: Render Test',()=>{
    const props = {
            weather : {
              icon: 'icon',
              text: 'text',
            },
            temperature: 0,
            date: 'date',
            linkKey: 'linkKey'
          };

    let wrapper;


    beforeEach(()=>{
        wrapper = shallow(
          <DailyBlockView {...props}/>
        );

    });

    it('+++ render the component', () => {
       expect(wrapper.length).toEqual(1);
    });

    it('+++ contains flat props', () => {
        expect(wrapper.find('p').text()).toContain(props.temperature);
        expect(wrapper.find('h2').text()).toEqual(props.date);
    });

    it('+++ contains nested props', () => {
        expect(wrapper.find(Link).find('img').prop('src')).toEqual(props.weather.icon);
        expect(wrapper.find(Link).find('img').prop('alt')).toEqual(props.weather.text);
    });

});


