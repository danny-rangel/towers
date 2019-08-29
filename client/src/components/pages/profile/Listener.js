import React, { useEffect } from 'react';
import { fetchFollowers, isFetching } from '../../../actions';
import { connect } from 'react-redux';
import Wrapper from '../../styled/Wrapper';
import ListenList from './ListenList';

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
            <ListenList users={users} fetching={fetching} listening={true} />
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
