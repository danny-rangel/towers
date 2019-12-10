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
import EditInputs from './EditInputs';

let EditProfile = ({
    isFetching,
    fetchUser,
    auth,
    updateProfile,
    fetching,
    handleSubmit,
    handleClose,
    refetch = () => null
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
        refetch();
        isFetching(false);
    };

    if (!auth) {
        return <div></div>;
    } else if (fetching) {
        return <></>;
    } else {
        return (
            <>
                <h1 style={{ textAlign: 'center', margin: '10px' }}>
                    Edit Profile
                </h1>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="ui form error"
                >
                    {' '}
                    <EditInputs />
                    <span
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            margin: '30px'
                        }}
                    >
                        <StyledButton
                            backgroundcolor="primary"
                            width="100px"
                            onClick={handleClose}
                        >
                            Cancel
                        </StyledButton>
                        <StyledButton
                            backgroundcolor="primary"
                            width="100px"
                            type="submit"
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

EditProfile = reduxForm({
    form: 'profileForm',
    enableReinitialize: true,
    validate
})(EditProfile);

EditProfile = connect(mapStateToProps, {
    fetchUser,
    isFetching,
    updateProfile,
    updateAVI
})(EditProfile);

export default EditProfile;
