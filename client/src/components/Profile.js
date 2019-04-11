import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkUser, fetchUserPosts, followUser, isFollowing, continuefetchUserPosts, fetchAllUserPostsCount } from '../actions';
import history from '../history';
import InfiniteScroll from 'react-infinite-scroll-component';

import PostList from '../components/post/PostList';
import './Profile.css'

const Profile = ({ user, auth, match, posts, following, followUser, isFollowing, checkUser, 
    fetchUserPosts, continuefetchUserPosts, fetchAllUserPostsCount, postCount }) => {

    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [followPressed, setFollowPressed] = useState(false);
    const username = match.params.username;

    const fetchProfileInformation = async () => {
        checkUser(username);
        fetchAllUserPostsCount(username);
        fetchUserPosts(username);
    }

    const fetchFollowingInformation = () => {
        if (auth) {
            isFollowing(username);
        }
    }

    
    useEffect(() => {
        setIsLoading(true);
        fetchProfileInformation();
        setIsLoading(false);
    }, [match.params.username]);

    useEffect(() => {
        setIsLoading(true);
        fetchFollowingInformation();
        setIsLoading(false);
    }, [auth])


    const follow = async (user, auth) => {
        setFollowPressed(true);
        let body = {
            personFollowingId: auth._id,
            personFollowedId: user._id,
            personFollowingUsername: auth.username,
            personFollowedUsername: user.username,
            personFollowingImage: auth.profileImage,
            personFollowedImage: user.profileImage
        }

        await followUser(body);
        await isFollowing(username);
        setFollowPressed(false);
    }


    const renderProfile = () => {
            return (
                <div>
                    <div id="topProfileContainer" className="ui inverted vertical masthead center aligned segment">
                        <div>
                            {
                                auth ? 
                                <img 
                                    alt={user.username} 
                                    style={{cursor: auth._id === user._id ? 'pointer' : 'default'}} 
                                    onClick={auth._id === user._id ? () => history.push(`/edit/avi/${auth._id}`) : null} 
                                    id="profileImage" 
                                    className="ui medium circular image" 
                                    src={user.profileImage}>
                                </img> 
                                :
                                <img 
                                    alt={user.username} 
                                    id="profileImage" 
                                    className="ui medium circular image" 
                                    src={user.profileImage}>
                                </img>
                            }
                        </div>
                        <h2>{user.username}</h2>
                        <h5 style={{margin: '0 5px', wordWrap: 'break-word'}}>{user.aboutme}</h5>
                        <div className="ui container">
                            <div id="profileStats" className="ui equal width grid">
                                <div className="column">
                                    <h4 id="profileStatsText" >{user.postsNumber}{user.postsNumber === 1 ? ' song': ' songs'}</h4>
                                </div>
                                <div className="column">
                                    <Link to={`/followers/${user._id}`} >
                                        <h4 id="profileStatsText">{user.followersCount}{" listeners"}</h4>
                                    </Link>
                                </div>
                                <div className="column">
                                    <Link to={`/following/${user._id}`} >
                                        <h4 id="profileStatsText">{user.followingCount} {" listening"}</h4>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {   auth ? 
                                user._id !== auth._id ?
                                    <button 
                                        onClick={() => follow(user, auth)} 
                                        id="profileStatsText"
                                        className={`ui ${followPressed ? 'disabled' : ''} button`}
                                        style={{backgroundColor: following ? 'black' : 'white', 
                                        color: following ? 'white' : 'black'}} >
                                        {following ? 'Listening' : 'Listen'}
                                    </button> 
                                    : 
                                    <Link 
                                        to={`/edit/${auth._id}`} 
                                        className="ui button"
                                        style={{backgroundColor: 'white', color: 'black'}} >
                                        Edit Profile
                                    </Link>
                            : 
                            <div></div>
                        }
                    </div>
                    <div id="profilePostsContainer" className="ui container">
                        <InfiniteScroll
                            dataLength={posts.length}
                            next={() => {
                                continuefetchUserPosts(user.username, page + 1, 20);
                                setPage(page + 1);
                            }}
                            hasMore={posts.length !== postCount}
                            loader={
                                <h4 style={{textAlign: 'center', color: 'white'}}>
                                    Loading...
                                </h4>
                            }
                            endMessage={
                                <h3 style={{textAlign: 'center', color: 'white'}}>
                                    <b>That's everything!</b>
                                </h3>
                        }>
                            <PostList posts={posts}/>
                        </InfiniteScroll>
                    </div>
                </div>
            );
        }

        

        if (isLoading || !posts || !user) {
            return <div className="ui active centered inline loader" style={{margin: '200px auto'}}></div>
        }
        else if (user) {
            return <div>{renderProfile()}</div>;
        } else {
            return  <div style={{ color: 'white', margin: '40px 0 0 0'}}><h3>This is not the user you're looking for...</h3></div>;
        }

}

const mapStateToProps = ({ user, posts, auth, following, postCount }) => {
    return { user, posts, auth, following, postCount }
}

export default connect(mapStateToProps, { checkUser, fetchUserPosts, followUser, 
    isFollowing, continuefetchUserPosts, fetchAllUserPostsCount })(Profile);