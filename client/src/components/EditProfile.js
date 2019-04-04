import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { fetchUser, isFetching, updateProfile, updateAVI } from '../actions';
import history from '../history';
import Modal from './Modal';

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
            aboutme: formValues.aboutme,
        }
        this.props.updateProfile(profile);

    }

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderUsernameInput = ({ input, label, meta }) => {
        return (
            <div className={`field ${meta.error && meta.touched ? 'error' : ''}`} >
                <label>{label}</label>
                <input {...input} />
                {this.renderError(meta)}
            </div>
        );
    }

    renderAboutMeInput = ({ input, label }) => {
        return (
            <div className="field">
                <label>{label}</label>
                <input {...input} />
            </div>
        );
    }

    header = (
        'Edit Profile'
    );

    content = (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <div style={{padding: '10px', margin: 0 }} >
                    <div className="ui equal width form">
                        <div className="fields">                       
                            <Field 
                                name="username" 
                                component={this.renderUsernameInput} 
                                placeholder="Username" 
                                label="Username">
                            </Field>
                        </div>
                        <div className="fields">
                            <Field 
                                name="aboutme" 
                                component={this.renderAboutMeInput}  
                                placeholder="About Me" 
                                label="About Me" 
                                rows="4" >
                            </Field>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <Link to={`/${this.props.auth.username}`} className="negative ui primary button postButton">Cancel</Link>
                            <button type="submit" className="ui primary button postButton">Save</button>
                        </div>
                    </div>
                </div>
            </form>
    );

    render() {
        const { auth } = this.props;
        
        if (!auth) {
            return <div></div>;
        } else {
            return (
                <>
                    <Modal onDismiss={() => history.push(`/${this.props.auth.username}`)} header={this.header} content={this.content} />
                </>
            );
        }
    }
}

const mapStateToProps = ({ auth }) => {
    return { 
        auth,
        initialValues: {
            username: auth.username,
            aboutme: auth.aboutme,
            avi: auth.profileImage
        }
    };
}

const validate = (formValues) => {
    const errors = {};

    if (!formValues.username) {
        errors.username = 'You must enter a username!';
    }

    return errors;
};


EditProfile = reduxForm({
    form: 'profileForm',
    enableReinitialize: true,
    validate
})(EditProfile);

EditProfile = connect(mapStateToProps, { fetchUser, isFetching, updateProfile, updateAVI })(EditProfile);


export default EditProfile;