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

        if (this.props.fetching) {
            return <div className="ui active inverted centered inline loader" style={{margin: '200px auto'}}></div>
        } else if (!this.props.songs) {
            return null
        } else {
            return (
                <div>
                    <div key="searchList" id="searchList" className="ui celled list">
                        {this.renderList()}
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = ({ songs, fetching }) => {
    return { songs, fetching };
}

export default connect(mapStateToProps, { isFetching })(SearchList);