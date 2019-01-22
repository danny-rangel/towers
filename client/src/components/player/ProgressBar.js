import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProgressBar.css';

class ProgressBar extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
      }
        toTime(e) {
            this.props.musicKit.player
            .seekToTime(this.props.musicKit.player.currentPlaybackDuration * (e.nativeEvent.offsetX / this.myRef.current.offsetWidth));
        }

        render() {
            return (
                <div id="innerProgressBar" ref={this.myRef} onClick={(e) => this.toTime(e)} >
                    <div id="styledProgressBar" style={{width: `${this.props.percentage * 100}%`}} />
                </div>
        );
    }
}


const mapStateToProps = ({ percentage, musicKit }) => {
    return { percentage, musicKit } 
}

export default connect(mapStateToProps)(ProgressBar);