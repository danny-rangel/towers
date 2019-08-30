import React, { useState } from 'react';
import { connect } from 'react-redux';
import { isFetching, updateAVI } from '../../../actions';
import axios from 'axios';
import StyledButton from '../../styled/Button';

const EditAVI = ({
    isFetching,
    updateAVI,
    auth,
    fetching,
    handleClose,
    refetch
}) => {
    const [avi, setAvi] = useState(null);

    const onSubmit = async () => {
        isFetching(true);
        const formData = new FormData();
        formData.append('avi', avi, avi.name);
        // this.props.updateAVI(formData, this.props.auth.username);

        const res = await axios.patch(`/api/avi`, formData);
        // dispatch({ type: 'update_avi', payload: res.data });
        await updateAVI(res.data);
        refetch();
        handleClose();
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
                    Edit Profile Picture
                </h1>
                <span style={{ display: 'flex', justifyContent: 'center' }}>
                    <input
                        type="file"
                        onChange={e => setAvi(e.target.files[0])}
                        style={{ padding: '10px' }}
                    />
                </span>
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
                        onClick={onSubmit}
                    >
                        Save
                    </StyledButton>
                </span>
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
    { isFetching, updateAVI }
)(EditAVI);
