import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { checkUser, fetchUserPosts, followUser, fetchUser, isFollowing, isFetching } from '../actions';
import history from '../history';

import PostList from '../components/post/PostList';
import Spinner from './Spinner';
import './Profile.css'

class Profile extends Component {

    async componentDidMount() {
        this.props.isFetching(true);
        await this.props.fetchUser();
        let user = this.props.match.params;
        await this.props.checkUser(user);

        if (this.props.auth.username === "" || this.props.auth.username === null) {
            history.push(`/edit/${this.props.auth._id}`);
        }
        

        if (this.props.user) {
            
            await this.props.fetchUserPosts(user);
            this.props.isFollowing(this.props.user._id);
        }
        this.props.isFetching(false);
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.username !== prevProps.match.params.username) {
            let user = this.props.match.params;
            await this.props.checkUser(user);


            if (this.props.user) {
                this.props.fetchUserPosts(user);
                this.props.isFollowing(this.props.user._id);
            }
        }
        
    }


    follow = async (user, auth) => {
        let body = {
            personFollowingId: auth._id,
            personFollowedId: user._id,
            personFollowingUsername: auth.username,
            personFollowedUsername: user.username,
            image: auth.profileImage
        }
        await this.props.followUser(body);
        this.props.isFollowing(this.props.user._id);
    }

//FIX SECTION WITH AUTH._ID TO CHECK IF THERE IS AN AUTH IN THE FIRST PLACE
//NEED TO BE ABLE TO SEE PROFILES EVEN IF NOT LOGGED IN?
    renderProfile() {
            return (
                <div>
                    <div id="topProfileContainer" className="ui inverted vertical masthead center aligned segment">
                        <img alt={this.props.user.username} id="profileImage" className="ui medium circular image"src={this.props.user.profileImage}></img>
                        <h2>{this.props.user.username}</h2>
                        {/* <h5 style={{margin: '0'}}>{this.props.user.aboutme}</h5> */}
                        <div className="ui container">
                            <div id="profileStats" className="ui equal width grid">
                                <div className="column">
                                    <h4 id="profileStatsText" ><h3>{this.props.user.postsNumber}</h3> {this.props.user.postsNumber === 1 ? 'song': 'songs'} </h4>
                                </div>
                                <div className="column">
                                    <h4 id="profileStatsText"><h3>{this.props.user.followersCount}</h3> {" listeners"}</h4>
                                </div>
                                <div className="column">
                                    <h4 id="profileStatsText"><h3>{this.props.user.followingCount}</h3> {" listening"}</h4>
                                </div>
                            </div>
                        </div>
                        
                        {/* { this.props.user._id !== this.props.auth._id ?
                                <button 
                                    onClick={() => this.follow(this.props.user, this.props.auth)} 
                                    className={this.props.following ? 'ui button' : 'ui inverted button'}>
                                    {this.props.following ? 'Listening' : 'Listen'}
                                </button> : 
                                <Link 
                                    to={`/edit/${this.props.auth._id}`} 
                                    className="ui inverted button">
                                    Edit Profile
                                </Link>
                            } */}
                    </div>
                    <div id="profilePostsContainer" className="ui container">
                        <PostList posts={this.props.posts}/>
                    </div>
                </div>
            );
        }

    render() {

        if (this.props.fetching) {
            return <Spinner />
        }

        if (!this.props.user) {
            return <div style={{ color: 'white', margin: '40px 0 0 0'}}><h3>This is not the user you're looking for...</h3></div>
        } else {
        return (
            <div>{this.renderProfile()}</div>
        );
    }
}
}

const mapStateToProps = ({ user, posts, auth, fetching, following }) => {
    return { user, posts, auth, fetching, following }
}

export default connect(mapStateToProps, { checkUser, fetchUserPosts, followUser, fetchUser, isFollowing, isFetching })(Profile);