import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {
    fetchUser,
    isFetching,
    updateProfile,
    updateAVI
} from '../../../actions';
import history from '../../../history';
import StyledButton from '../../styled/Button';
import NewProfileInputs from './NewProfileInputs';

let NewProfile = ({
    isFetching,
    fetchUser,
    auth,
    updateProfile,
    fetching,
    handleSubmit,
    handleClose
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

    if (!auth) {
        return <div></div>;
    } else if (fetching) {
        return <></>;
    } else {
        return (
            <>
                <h1 style={{ textAlign: 'center', margin: '40px' }}>
                    Let's get you set up
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="ui form error"
                >
                    {' '}
                    <NewProfileInputs />
                    <span
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            margin: '30px',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <StyledButton
                            backgroundcolor="primary"
                            width="200px"
                            type="submit"
                            margin="10px"
                        >
                            Save
                        </StyledButton>
                    </span>
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

NewProfile = reduxForm({
    form: 'profileForm',
    enableReinitialize: true,
    validate
})(NewProfile);

NewProfile = connect(mapStateToProps, {
    fetchUser,
    isFetching,
    updateProfile,
    updateAVI
})(NewProfile);

export default NewProfile;
