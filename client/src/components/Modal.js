import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = props => {
    return ReactDOM.createPortal(
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
            <div onClick={(e) => e.stopPropagation()} style={{maxWidth: '50%'}} className="ui standard modal visible active">
                <div className="header" style={{textAlign: 'center'}}>{props.header}</div>
                <div className="content" id="modalContent" >{props.content}</div>        
            </div>
        </div>,
        document.querySelector('#modal')
    );
};

export default Modal;