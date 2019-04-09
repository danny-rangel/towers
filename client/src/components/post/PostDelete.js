import React,  { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../../actions';
import history from '../../history';
import Modal from '../Modal';

class PostDelete extends Component {

    componentDidMount() {
        this.props.fetchPost(this.props.match.params);
    }

    async selectAndDeletePost() {
        await this.props.deletePost(this.props.fetchedPost);
    }

    header = (
        'Delete Post'
    );

    content = (
        <div style={{ textAlign: 'center' }}>
            <h4>Are you sure you want to delete this post?</h4>
                <button onClick={() => history.goBack()} className="negative ui primary button postButton">Cancel</button>
                <button className="ui red button postButton" onClick={() => this.selectAndDeletePost()} >Delete</button>
        </div>
    );

    render() {
        if (!this.props.fetchedPost) {
            return null;
        } else {
            return (
                <div style={{padding: '0px 14px'}}>
                    <Modal onDismiss={() => history.goBack()} content={this.content} header={this.header} />
                </div>
            );
        }
        
    }
}

const mapStateToProps = ({ fetchedPost }) => {
    return { fetchedPost };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostDelete);


