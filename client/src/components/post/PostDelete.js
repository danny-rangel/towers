import React,  { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSinglePost, deletePost } from '../../actions';
import PostItem from './PostItem';

class PostDelete extends Component {

    componentDidMount() {
        this.props.fetchSinglePost(this.props.match.params);
    }

    async selectAndDeletePost() {
        await this.props.deletePost(this.props.singlePost);
    }

    render() {
        return (
            <div>
                <PostItem post={this.props.singlePost}/>
                <button className="ui red button" onClick={() => this.selectAndDeletePost()} >Delete</button>
            </div>
        );
    }
}

const mapStateToProps = ({ singlePost }) => {
    return { singlePost };
}

export default connect(mapStateToProps, { fetchSinglePost, deletePost })(PostDelete);


