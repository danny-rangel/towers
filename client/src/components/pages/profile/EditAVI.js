import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser, isFetching, updateAVI } from '../../../actions';
import history from '../../../history';
import axios from 'axios';

const EditAVI = ({ isFetching, fetchUser, updateAVI, auth, fetching }) => {
    const [avi, setAvi] = useState(null);
    const [percentCompleted, setPercentCompleted] = useState(null);

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

    const onSubmit = async () => {
        isFetching(true);
        const formData = new FormData();
        formData.append('avi', avi, avi.name);
        // this.props.updateAVI(formData, this.props.auth.username);

        let config = {
            onUploadProgress: progressEvent => {
                let percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setPercentCompleted(percentCompleted);
                //   console.log(this.state.percentCompleted);
            }
        };

        const res = await axios.patch(`/api/avi`, formData, config);
        // dispatch({ type: 'update_avi', payload: res.data });
        await updateAVI(res.data);
        isFetching(false);
    };

    let header = 'Edit Profile Picture';

    let content = (
        <div>
            <input type="file" onChange={e => setAvi(e.target.files[0])} />

            <Link
                to={`/${auth.username}`}
                className="negative ui primary button postButton"
            >
                Cancel
            </Link>
            <button onClick={onSubmit} className="ui primary button postButton">
                Save
            </button>
        </div>
    );

    if (!auth) {
        return <div></div>;
    } else if (fetching) {
        return <></>;
    } else {
        return (
            <>
                {/* <Modal
                        onDismiss={() => history.push(`/${auth.username}`)}
                        header={this.header}
                        content={this.content}
                    /> */}
            </>
        );
    }
};

const mapStateToProps = ({ auth, fetching }) => {
    return {
        auth,
        fetching
    };
};

export default connect(
    mapStateToProps,
    { fetchUser, isFetching, updateAVI }
)(EditAVI);
