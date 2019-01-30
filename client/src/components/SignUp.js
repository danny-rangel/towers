import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';
import form from 'redux-form';

class SignUp extends Component {

    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return<div></div>;
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth };
}

export default connect(mapStateToProps, { fetchUser })(SignUp);