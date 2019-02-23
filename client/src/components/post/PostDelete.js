import React,  { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../../actions';
import PostItem from './PostItem';

class PostDelete extends Component {

    async componentDidMount() {
        await this.props.fetchPost(this.props.match.params);
    }

    async selectAndDeletePost() {
        await this.props.deletePost(this.props.posts[0]);
    }

    render() {
        return (
            <div>
                <PostItem post={this.props.posts[0]}/>
                <button className="ui red button" onClick={() => this.selectAndDeletePost()} >Delete</button>
            </div>
        );
    }
}

const mapStateToProps = ({ posts }) => {
    return { posts };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostDelete);


