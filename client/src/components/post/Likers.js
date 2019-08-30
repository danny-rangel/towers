import React, { useEffect } from 'react';
import { fetchPostLikes, isFetching } from '../../actions';
import { connect } from 'react-redux';
import Wrapper from '../styled/Wrapper';
import UserList from '../styled/UserList';

const Likers = ({ isFetching, fetchPostLikes, match, users, fetching }) => {
    useEffect(() => {
        const fetchLikes = async () => {
            isFetching(true);
            await fetchPostLikes(match.params.id);
            isFetching(false);
        };

        fetchLikes();
    }, []);
    return (
        <Wrapper>
            <h1 style={{ alignSelf: 'center' }}>Likes</h1>
            <UserList users={users} fetching={fetching} />
        </Wrapper>
    );
};

const mapStateToProps = ({ users, fetching }) => {
    return {
        users,
        fetching
    };
};

export default connect(
    mapStateToProps,
    { fetchPostLikes, isFetching }
)(Likers);
