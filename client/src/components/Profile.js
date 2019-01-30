import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkUser, fetchUserPosts, followUser, fetchUser, isFollowing } from '../actions';
import Spinner from './Spinner';
import './Profile.css'

import PostList from '../components/post/PostList';
class Profile extends Component {

    async componentDidMount() {
        await this.props.fetchUser();
        let user = this.props.match.params;
        await this.props.checkUser(user);
        

        if (this.props.user) {
            this.props.fetchUserPosts(user);
            this.props.isFollowing(this.props.user._id);
        }
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
            personFollowedId: user._id
        }
        await this.props.followUser(body);
        this.props.isFollowing(this.props.user._id);
    }


    renderProfile() {
            return (
                <div>
                    <div id="topProfileContainer" className="ui inverted vertical masthead center aligned segment">
                        <img alt={this.props.user.username} id="profileImage" className="ui medium circular image"src={this.props.user.profileImage}></img>
                        <h2>{this.props.user.username}</h2>
                        <h4>{this.props.user.postsNumber} {this.props.user.postsNumber === 1 ? 'song': 'songs'} </h4>
                            <p>{this.props.user.followersCount} followers</p>
                            <p>{this.props.user.followingCount} following</p>
                        { this.props.user._id !== this.props.auth._id ?
                            <button 
                                onClick={() => this.follow(this.props.user, this.props.auth)} 
                                className={this.props.following ? 'ui button' : 'ui inverted button'}>
                                {this.props.following ? 'Following' : 'Follow'}
                            </button> : 
                            <Link 
                                to="/editProfile" 
                                className="ui inverted button">
                                Edit Profile
                            </Link>
                        }
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

        if (!this.props.user || !this.props.auth) {
            return <div>This user does not exist</div>
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

export default connect(mapStateToProps, { checkUser, fetchUserPosts, followUser, fetchUser, isFollowing })(Profile);