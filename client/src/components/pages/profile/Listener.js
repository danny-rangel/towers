import React, { useEffect } from 'react';
import { fetchFollowers, isFetching } from '../../../actions';
import { connect } from 'react-redux';
import Wrapper from '../../styled/Wrapper';
import UserList from '../../styled/UserList';

const Listener = ({ isFetching, fetchFollowers, match, users, fetching }) => {
    useEffect(() => {
        const fetchFollowerInfo = async () => {
            isFetching(true);
            await fetchFollowers(match.params.id);
            isFetching(false);
        };

        fetchFollowerInfo();
    }, []);
    return (
        <Wrapper>
            <h1 style={{ alignSelf: 'center' }}>Listeners</h1>
            <UserList users={users} fetching={fetching} listening={true} />
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
    { fetchFollowers, isFetching }
)(Listener);
