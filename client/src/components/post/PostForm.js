import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PostField from './PostField';
import { submitPost, isFetching } from '../../actions';
import StyledButton from '../styled/Button';

const StyledForm = styled.form`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const StyledSpan = styled.span`
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin: 20px 0px;
`;

const PostForm = ({
    auth,
    isFetching,
    submitPost,
    selectedSong,
    handleSubmit,
    handleClose
}) => {
    const collectValues = async ({ attributes }, { caption }) => {
        isFetching(true);
        if (!caption) {
            caption = null;
        }
        const post = {
            username: auth.username,
            userId: auth._id,
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

    return (
        <StyledForm
            onSubmit={handleSubmit(values =>
                collectValues(selectedSong, values)
            )}
        >
            <img
                alt={selectedSong.attributes.name}
                src={window.MusicKit.formatArtworkURL(
                    selectedSong.attributes.artwork,
                    420,
                    420
                )}
                style={{ width: '100%', maxWidth: '400px' }}
            ></img>
            <span
                style={{
                    padding: '10px',
                    width: '100%',
                    boxSizing: 'border-box',
                    maxWidth: '400px',
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
            >
                <h4 style={{ margin: '10px 0 0 0' }}>
                    {selectedSong.attributes.name}
                </h4>
                <h5
                    style={{
                        margin: '5px 0 0 0',
                        color: 'rgba(97, 97, 97, 0.87)'
                    }}
                >
                    {selectedSong.attributes.artistName}
                </h5>
            </span>
            <Field
                autoComplete="off"
                type="text"
                name="caption"
                component={PostField}
                placeholder="Write a caption..."
            />
            <StyledSpan>
                <StyledButton
                    backgroundcolor="primary"
                    onClick={handleClose}
                    width="115px"
                >
                    Cancel
                </StyledButton>
                <StyledButton
                    backgroundcolor="primary"
                    type="submit"
                    width="115px"
                >
                    Post
                </StyledButton>
            </StyledSpan>
        </StyledForm>
    );
};

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
