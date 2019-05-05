import React from 'react';
import { mount } from 'enzyme';
import Root from '../../Root';
import Landing from '../Landing';


let wrapper;

beforeEach(() => {
    wrapper = mount(
        <Root>
            <Landing />
        </Root>
    );
});

afterEach(() => {
    wrapper.unmount();
})

it('renders a div', () => {
    expect(wrapper.find('div').length).toEqual(1);
});