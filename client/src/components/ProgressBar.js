import React, { Component } from 'react';
import './ProgressBar.css';

class ProgressBar extends Component {

    render() {
        const { percentage } = this.props;
        // console.log('PROPS', percentage);
        return (
            <div id="innerProgressBar">
                <div id="styledProgressBar" style={{width: `${percentage}%`}} />
            </div>
        );
    }
}

export default ProgressBar;