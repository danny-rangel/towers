import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PostField from './PostField';
import { submitPost } from '../../actions';
import './PostForm.css';

class PostForm extends Component {

    collectValues(selectedSong, values) {
        if (!values.caption) {
            values.caption = null;
        }
        const post =  {
            username: this.props.auth.username,
            userId: this.props.auth._id,
            songId: selectedSong.attributes.id,
            caption: values.caption,
            songName: selectedSong.attributes.name,
            artistName: selectedSong.attributes.artistName,
            durationInMillis: selectedSong.attributes.durationInMillis,
            songURL: selectedSong.attributes.url,
            albumArt: window.MusicKit.formatArtworkURL(selectedSong.attributes.artwork, 800, 800),
            previewURL: selectedSong.attributes.previews[0].url
        }
        this.props.submitPost(post);
    }

    renderField() {
        return (
            <div id="postCardContainer">
                <div className="ui card" id="previewPostCard">
                    <div className="content" style={{ textAlign: 'center' }}>
                    </div>
                    <div className="image">
                        <img alt={this.props.selectedSong.attributes.name} src={window.MusicKit.formatArtworkURL(this.props.selectedSong.attributes.artwork, 800, 800)}></img>
                    </div>
                    <div className="content">
                            <h1  href="/home" className="header">{this.props.selectedSong.attributes.name}</h1>
                            <div className="meta">
                                <span className="date">{this.props.selectedSong.attributes.artistName}</span>
                            </div>
                    </div>
                    <Field autoComplete="off" type="text" name="caption" component={PostField} placeholder="Write a caption..." />  
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit((values) => this.collectValues(this.props.selectedSong, values))}>
                    {this.renderField()}
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({ selectedSong, auth }) => {
    return { selectedSong, auth };
}

export default reduxForm({
    form: 'postForm'
})(connect(mapStateToProps, { submitPost })(PostForm));