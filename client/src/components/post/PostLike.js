import React, { Component } from 'react';
import { connect } from 'react-redux';
import { likePost } from '../../actions';

class PostLike extends Component {


    async collectAndSubmitLike() {
        const like =  {
            postId: this.props.post._id,
            likerId: this.props.auth._id,
            username: this.props.auth.username
        }
        await this.props.likePost(like);
    }

    render() {
        return (
                <span className="left floated">
                    <i className="heart outline like icon" onClick={() => this.collectAndSubmitLike()}></i>
                    {this.props.post.likes} likes
                </span>
        );
    }
}

const mapStateToProps = ({ auth, likePost }) => {
    return { auth, likePost };
}

export default connect(mapStateToProps, { likePost })(PostLike);