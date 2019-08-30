import React from 'react';
import { connect } from 'react-redux';
import { isFetching } from '../../../actions';
import styled from 'styled-components';

import SearchItem from './SearchItem';
import Loader from '../../styled/Loader';
import Paper from '@material-ui/core/Paper';

const StyledPaper = styled(Paper)`
    && {
        margin: 20px 0;
        width: 100%;
        min-height: 101px;
        max-width: 500px;
        box-shadow: 3px 4px 12px rgba(0, 0, 0, 0.43);
        display: flex;
        flex-direction: column;
        padding: 0px;
        box-sizing: border-box;
        border-radius: 0px;
        box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
            0px 4px 5px 0px rgba(0, 0, 0, 0.14),
            0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    }
`;

const SearchSongsList = ({ songs, fetching }) => {
    const renderList = () => {
        if (songs.length === 0) {
            return <>No songs found</>;
        }
        return songs.map(song => {
            return <SearchItem key={song.id} song={song} />;
        });
    };

    if (fetching) {
        return <Loader height="40px" width="40px" />;
    } else if (!songs) {
        return null;
    } else {
        return <StyledPaper>{renderList()}</StyledPaper>;
    }
};

const mapStateToProps = ({ songs, fetching }) => {
    return { songs, fetching };
};

export default connect(
    mapStateToProps,
    { isFetching }
)(SearchSongsList);
