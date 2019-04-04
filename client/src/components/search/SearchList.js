import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isFetching } from '../../actions';
import SearchItem from './SearchItem';
import './SearchList.css';

class SearchList extends Component {

    renderList() {
        if (this.props.songs.length === 0) {
            return <div>No songs found</div>;
        }
        return this.props.songs.map(song => {
            return (
                <SearchItem key={song.id} song={song} />
            );
        });
    }

    render() {

        if (!this.props.songs) {
            return null
        }
        return (
            <div>
                <div key="searchList" id="searchList" className="ui celled list">
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ songs }) => {
    return { songs };
}

export default connect(mapStateToProps, { isFetching })(SearchList);