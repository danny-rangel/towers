import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setVolume } from '../../actions';

class VolumeBar extends Component {

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
      }
        changeVol() {
            this.props.musicKit.player.volume = this.myRef.current.value;
            this.props.setVolume(this.props.musicKit.player.volume);
        }

        render() {
            return (
                <input 
                    style={{ display: 'block', width: `100%`, height: 5, backgroundColor: '#ccc', borderRadius: '5px'}} 
                    ref={this.myRef} onChange={() => this.changeVol()} 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01">
                </input>
        );
    }
}


const mapStateToProps = ({ percentage, musicKit }) => {
    return { percentage, musicKit } 
}

export default connect(mapStateToProps, {setVolume})(VolumeBar);