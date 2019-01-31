import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { fetchUser, isFetching, updateProfile } from '../actions';
import history from '../history';
import { format } from 'path';

class EditProfile extends Component {

    async componentDidMount() {
        this.props.isFetching(true);
        await this.props.fetchUser();
        this.props.isFetching(false);

        if (!this.props.auth) {
            history.push('/');
        }
    }

    onSubmit = (formValues) => {
        let profile = {
            id: this.props.auth._id,
            username: formValues.username,
            aboutme: formValues.aboutme
        }
        this.props.updateProfile(profile);
    }

    render() {

        if (!this.props.auth) {
            return <div></div>;
        }

        return (
            <div style={{padding: '80px 5px'}}>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                <div style={{padding: '20px'}} className="ui raised very padded text container segment">
                    <div className="ui equal width form">
                        <div className="fields">
                            <div className="field">
                                <label>Username</label>
                                <Field value={this.props.auth.username} name="username" component="input" type="text" placeholder="Username" ></Field>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="field">
                                <label>About Me</label>
                                <Field type="text" component="textarea" name="aboutme" placeholder="About Me" rows="2" ></Field>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                        <Link to={`/${this.props.auth.username}`} className="negative ui primary button postButton">Cancel</Link>
                        <button type="submit" className="ui primary button postButton">Save</button>
                </div>
                    </div>
                </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth };
}

export default reduxForm({
    form: 'profileForm'
})(connect(mapStateToProps, { fetchUser, isFetching, updateProfile })(EditProfile));