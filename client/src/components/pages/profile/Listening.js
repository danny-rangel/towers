import React, { useEffect } from 'react';
import { fetchFollowing, isFetching } from '../../../actions';
import { connect } from 'react-redux';
import Wrapper from '../../styled/Wrapper';
import UserList from '../../styled/UserList';

const Listening = ({ isFetching, fetchFollowing, match, users, fetching }) => {
    useEffect(() => {
        const fetchFollowerInfo = async () => {
            isFetching(true);
            await fetchFollowing(match.params.id);
            isFetching(false);
        };

        fetchFollowerInfo();
    }, []);
    return (
        <Wrapper>
            <h1 style={{ alignSelf: 'center' }}>Listening</h1>
            <UserList users={users} fetching={fetching} listener={true} />
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
    { fetchFollowing, isFetching }
)(Listening);
