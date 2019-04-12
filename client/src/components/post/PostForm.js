import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PostField from './PostField';
import { submitPost, isFetching } from '../../actions';
import './PostForm.css';
import PostModal from '../PostModal';
import history from '../../history';

class PostForm extends Component {

    state = { loaded: false };

    collectValues = async (selectedSong, values) => {
        this.props.isFetching(true);
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
            genres: selectedSong.attributes.genreNames,
            songURL: selectedSong.attributes.url,
            albumArt: window.MusicKit.formatArtworkURL(selectedSong.attributes.artwork, 420, 420),
            albumName: selectedSong.attributes.albumName,
            previewURL: selectedSong.attributes.previews[0].url
        }
        await this.props.submitPost(post);
        this.props.isFetching(false);
    }



    renderContent = () => {
        return (
            <form onSubmit={this.props.handleSubmit((values) => this.collectValues(this.props.selectedSong, values))}>
                <div className="ui card" id="previewPostCard">
                    <div className="content" style={{ textAlign: 'center' }}>
                    </div>
                    <div className="ui placeholder" style={{display: this.state.loaded ? 'none' : 'block'}}>
                        <div className="square image" style={{width: '100%', height: 'auto'}}></div>
                    </div>
                    <div className="image" style={{display: this.state.loaded ? 'block' : 'none'}}>
                        <img onLoad={() => this.setState({ loaded: true })} alt={this.props.selectedSong.attributes.name} src={window.MusicKit.formatArtworkURL(this.props.selectedSong.attributes.artwork, 420, 420)}></img>
                    </div>
                    <div className="content" style={{ textAlign: 'center' }} >
                        <h1  href="/home" className="header" id="postFormHeader" >{this.props.selectedSong.attributes.name}</h1>
                        <div className="meta">
                            <span className="date">{this.props.selectedSong.attributes.artistName}</span>
                        </div>
                    </div>
                    <Field autoComplete="off" type="text" name="caption" component={PostField} placeholder="Write a caption..." />  
                </div>
            </form>
        
        );
    }


    render() {
        return (
            <>
                <PostModal onDismiss={() => history.push('/search')} content={this.renderContent()} />
            </>
        );
    }
}

const mapStateToProps = ({ selectedSong, auth }) => {
    return { selectedSong, auth };
}

export default reduxForm({
    form: 'postForm'
})(connect(mapStateToProps, { submitPost, isFetching })(PostForm));