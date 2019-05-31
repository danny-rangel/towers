import React from 'react';

const Spinner = ({ message }) => {
    return (
        <div id="spinner" className="ui active dimmer">
            <div className="ui big text loader">{message}</div>
        </div>
    );
};

Spinner.defaultProps = {
    message: ''
};

export default Spinner;