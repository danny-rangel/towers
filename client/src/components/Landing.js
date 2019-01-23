import React, { Component } from 'react';
import { connect } from 'react-redux';
import history from '../history';


class Landing extends Component {


    render() {

        if (this.props.auth) {
            history.push('/home');
        }

        return(
                <div></div>
        );
    }
}


const mapStateToProps = (state) => {
    return { auth: state.auth }
}


export default connect(mapStateToProps)(Landing);