import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser, isFetching, updateAVI } from '../../../actions';
import history from '../../../history';
import Modal from '../../styled/Modal';
import axios from 'axios';
import Spinner from '../../styled/Spinner';

class EditAVI extends Component {
    state = { avi: null, percentCompleted: null };

    async componentDidMount() {
        this.props.isFetching(true);
        await this.props.fetchUser();
        this.props.isFetching(false);

        if (!this.props.auth) {
            history.push('/');
        }
    }

    onSubmit = async () => {
        this.props.isFetching(true);
        const formData = new FormData();
        formData.append('avi', this.state.avi, this.state.avi.name);
        // this.props.updateAVI(formData, this.props.auth.username);

        let config = {
            onUploadProgress: progressEvent => {
                let percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                this.setState({ percentCompleted: percentCompleted });
                //   console.log(this.state.percentCompleted);
            }
        };

        const res = await axios.patch(`/api/avi`, formData, config);
        // dispatch({ type: 'update_avi', payload: res.data });
        await this.props.updateAVI(res.data);
        this.props.isFetching(false);
    };

    header = 'Edit Profile Picture';

    content = (
        <div style={{ padding: '10px', margin: 0 }}>
            <div className="ui equal width form">
                <div>
                    <label></label>
                    <input
                        type="file"
                        onChange={e =>
                            this.setState({ avi: e.target.files[0] })
                        }
                    />
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Link
                        to={`/${this.props.auth.username}`}
                        className="negative ui primary button postButton"
                    >
                        Cancel
                    </Link>
                    <button
                        onClick={this.onSubmit}
                        className="ui primary button postButton"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );

    render() {
        const { auth, fetching } = this.props;

        if (!auth) {
            return <div></div>;
        } else if (fetching) {
            return <Spinner />;
        } else {
            return (
                <>
                    <Modal
                        onDismiss={() => history.push(`/${auth.username}`)}
                        header={this.header}
                        content={this.content}
                    />
                </>
            );
        }
    }
}

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
