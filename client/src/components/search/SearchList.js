import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchItem from './SearchItem';
import './SearchList.css';

class SearchList extends Component {

    renderList() {
        return this.props.songs.map(song => {
            return (
                    <SearchItem key={song.attributes.id} song={song} />
            );
        })
    }

    render() {
        return (
            <div id="searchList" className="ui celled list">
                {this.renderList()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { songs: state.songs };
}

export default connect(mapStateToProps)(SearchList);