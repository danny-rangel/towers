import React from 'react';
import ReactDOM from 'react-dom';
import './PostModal.css';

const PostModal = props => {
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
            <div onClick={(e) => e.stopPropagation()} id="postModalInner" className="ui standard modal visible active">
                <div className="content" id="postModalContent" >{props.content}</div>        
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default PostModal;