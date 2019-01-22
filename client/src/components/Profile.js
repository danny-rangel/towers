import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkUser, fetchUserPosts, followUser, fetchUser } from '../actions';
import './Profile.css'

import PostList from '../components/post/PostList';
// TO DO: TEST TO SEE WHY AUTH ID IS UNDEFINED WHEN RENDERING COMPONENT
class Profile extends Component {

    async componentDidMount() {
        this.props.fetchUser();
        let user = this.props.match.params;
        await this.props.checkUser(user);
        

        if (this.props.user) {
            this.props.fetchUserPosts(user);
            
        }
    }

    follow = async (user, auth) => {
        let body = {
            personFollowingId: auth._id,
            personFollowedId: user._id
        }
        await this.props.followUser(body);
        await this.props.checkUser(user);
    }


    renderProfile() {
        if (!this.props.user) {
            return <div>This user does not exist!</div>
        }
        else if (this.props.user._id === this.props.auth._id) {
            return (
                <div>
                    <div id="topProfileContainer" className="ui inverted vertical masthead center aligned segment">
                        <img alt={this.props.user.username} id="profileImage" className="ui medium circular image"src={this.props.user.profileImage}></img>
                        <h2>{this.props.user.username}</h2>
                        <h3>{this.props.user.postsNumber} {this.props.user.postsNumber === 1 ? 'song': 'songs'} </h3>
                            <p>{this.props.user.followersCount} followers</p>
                            <p>{this.props.user.followingCount} following</p>
                    </div>
                    <div id="profilePostsContainer" className="ui container">
                        <PostList posts={this.props.userPosts}/>
                    </div>
                </div>
            );


        } else {
            return (
                <div>
                    <div id="topProfileContainer" className="ui inverted vertical masthead center aligned segment">
                        <img alt={this.props.user.username} id="profileImage" className="ui medium circular image"src={this.props.user.profileImage}></img>
                        <h2>{this.props.user.username}</h2>
                        <h4>{this.props.user.postsNumber} {this.props.user.postsNumber === 1 ? 'song': 'songs'} </h4>
                            <p>{this.props.user.followersCount} followers</p>
                            <p>{this.props.user.followingCount} following</p>
                        <button onClick={() => this.follow(this.props.user, this.props.auth)} className="ui inverted button">Follow</button>
                    </div>
                    <div id="profilePostsContainer" className="ui container">
                        <PostList posts={this.props.userPosts}/>
                    </div>
                </div>
            );
        }
    }

    render() {
        if (!this.props.user || !this.props.auth) {
            return <div></div>
        } else {
        return (
            <div>{this.renderProfile()}</div>
        );
    }
}
}

const mapStateToProps = (state) => {
    return { user: state.user, userPosts: state.userPosts, auth: state.auth }
}

export default connect(mapStateToProps, { checkUser, fetchUserPosts, followUser, fetchUser })(Profile);