import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PostField from './PostField';
import { submitPost, isFetching } from '../../actions';
import './PostForm.css';
import history from '../../history';

class PostForm extends Component {
    state = { loaded: false };

    collectValues = async ({ attributes }, { caption }) => {
        const {
            auth: { username, _id },
            isFetching,
            submitPost
        } = this.props;
        isFetching(true);
        if (!caption) {
            caption = null;
        }
        const post = {
            username: username,
            userId: _id,
            songId: attributes.id,
            caption: caption,
            songName: attributes.name,
            artistName: attributes.artistName,
            durationInMillis: attributes.durationInMillis,
            genres: attributes.genreNames,
            songURL: attributes.url,
            albumArt: window.MusicKit.formatArtworkURL(
                attributes.artwork,
                420,
                420
            ),
            albumName: attributes.albumName,
            previewURL: attributes.previews[0].url
        };
        await submitPost(post);
        isFetching(false);
    };

    renderContent = () => {
        const { handleSubmit, selectedSong } = this.props;
        const { loaded } = this.state;
        return (
            <form
                onSubmit={handleSubmit(values =>
                    this.collectValues(selectedSong, values)
                )}
            >
                <div>
                    <div></div>
                    <div style={{ display: loaded ? 'none' : 'block' }}>
                        <div></div>
                    </div>
                    <div style={{ display: loaded ? 'block' : 'none' }}>
                        <img
                            onLoad={() => this.setState({ loaded: true })}
                            alt={selectedSong.attributes.name}
                            src={window.MusicKit.formatArtworkURL(
                                selectedSong.attributes.artwork,
                                420,
                                420
                            )}
                        ></img>
                    </div>
                    <div>
                        <h1 href="/home">{selectedSong.attributes.name}</h1>
                        <div>
                            <span>{selectedSong.attributes.artistName}</span>
                        </div>
                    </div>
                    <Field
                        autoComplete="off"
                        type="text"
                        name="caption"
                        component={PostField}
                        placeholder="Write a caption..."
                    />
                </div>
            </form>
        );
    };

    render() {
        return (
            <>
                {/* <PostModal
                    onDismiss={() => history.push('/search')}
                    content={this.renderContent()}
                /> */}
            </>
        );
    }
}

const mapStateToProps = ({ selectedSong, auth }) => {
    return { selectedSong, auth };
};

export default reduxForm({
    form: 'postForm'
})(
    connect(
        mapStateToProps,
        { submitPost, isFetching }
    )(PostForm)
);
