import React from 'react';

const Spinner = (props) => {
    return (
        <div id="spinner" className="ui active dimmer">
            <div className="ui big text loader">{props.message}</div>
        </div>
    );
};

Spinner.defaultProps = {
    message: ''
};

export default Spinner;