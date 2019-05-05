import React from 'react';
import { mount } from 'enzyme';

import Profile from '../Profile';
import Root from '../../Root';
import PostList from '../post/PostList';

let wrapper;

beforeEach(() => {
    const initialState = {
        user: {
            _id: "5ca5c8e556fc10001701db50",
            username: "dannyrangel",
            aboutme: ":((",
            profileImage: "https://towers-prod.s3.amazonaws.com/towers-prod/5ca5c8e556fc10001701db50",
            followersCount: 10,
            followingCount: 15,
            postsNumber: 17
        },
        auth: {
            username: "dannyrangel",
            aboutme: ":((",
            profileImage: "https://towers-prod.s3.amazonaws.com/towers-prod/5ca5c8e556fc10001701db50",
            followersCount: 10,
            followingCount: 15,
            postsNumber: 17,
            _id: "5ca5c8e556fc10001701db50",
        }
    };

    const match  = {
        params: {
            username: 'dannyrangel'
        }
    }

    wrapper = mount(
        <Root initialState={initialState} >
            <Profile match={match}/>
        </Root>
    );
});

afterEach(() => {
    wrapper.unmount();
});

it('renders a div', () => {
    expect(wrapper.find('div').length).toEqual(1);
});

