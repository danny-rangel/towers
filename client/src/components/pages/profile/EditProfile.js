import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import {
    fetchUser,
    isFetching,
    updateProfile,
    updateAVI
} from '../../../actions';
import history from '../../../history';

let EditProfile = ({
    isFetching,
    fetchUser,
    auth,
    updateProfile,
    fetching,
    handleSubmit
}) => {
    useEffect(() => {
        const fetchUserInfo = async () => {
            isFetching(true);
            await fetchUser();
            isFetching(false);
        };

        fetchUserInfo();

        if (!auth) {
            history.push('/');
        }
    }, []);

    let lower = value => value && value.toLowerCase();

    const onSubmit = async ({ username, aboutme }) => {
        isFetching(true);
        let profile = {
            id: auth._id,
            username,
            aboutme
        };
        await updateProfile(profile);
        isFetching(false);
    };

    const renderError = ({ error, touched }) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    };

    const renderUsernameInput = ({ input, label, meta }) => {
        return (
            <div
                className={`field ${meta.error && meta.touched ? 'error' : ''}`}
            >
                <label>{label}</label>
                <input {...input} />
                {renderError(meta)}
            </div>
        );
    };

    const renderAboutMeInput = ({ input, label, meta }) => {
        return (
            <div
                className={`field ${meta.error && meta.touched ? 'error' : ''}`}
            >
                <label>{label}</label>
                <input {...input} />
                {renderError(meta)}
            </div>
        );
    };

    if (!auth) {
        return <div></div>;
    } else if (fetching) {
        return <></>;
    } else {
        return (
            <>
                <h2>Edit Profile</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="ui form error"
                >
                    <Field
                        name="username"
                        component={renderUsernameInput}
                        placeholder="Username"
                        normalize={lower}
                        label="Username"
                    ></Field>

                    <Field
                        name="aboutme"
                        component={renderAboutMeInput}
                        placeholder="About Me"
                        label="Bio"
                        rows="4"
                    ></Field>

                    <Link
                        to={`/${auth.username}`}
                        className="negative ui primary button postButton"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="ui primary button postButton"
                    >
                        Save
                    </button>
                </form>
            </>
        );
    }
};

const mapStateToProps = ({ auth, fetching }) => {
    return {
        auth,
        fetching,
        initialValues: {
            username: auth.username,
            aboutme: auth.aboutme,
            avi: auth.profileImage
        }
    };
};

const validate = ({ username, aboutme }) => {
    const errors = {};

    if (!username) {
        errors.username = 'You must enter a username!';
    }

    if (username) {
        if (username.length > 30) {
            errors.username = 'Your username is too long!';
        }

        if (!username.match(/^\w+$/)) {
            errors.username =
                'Usernames can only use letters, numbers, and underscores.';
        }
    }

    if (aboutme) {
        if (aboutme.length > 110) {
            errors.aboutme = 'Your bio is too long!';
        }
    }

    return errors;
};

EditProfile = reduxForm({
    form: 'profileForm',
    enableReinitialize: true,
    validate
})(EditProfile);

EditProfile = connect(
    mapStateToProps,
    { fetchUser, isFetching, updateProfile, updateAVI }
)(EditProfile);

export default EditProfile;
