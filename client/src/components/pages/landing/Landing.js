import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import history from '../../../history';

const Landing = ({ auth }) => {
    useEffect(() => {
        if (auth) {
            history.push('/home');
        }
    }, [auth]);

    return (
        <div>
            <h1
                style={{
                    color: 'white',
                    margin: '240px 0',
                    fontWeight: '100',
                    letterSpacing: '-6px',
                    fontSize: '4rem'
                }}
            >
                towers
            </h1>
        </div>
    );
};

const mapStateToProps = ({ auth }) => {
    return { auth };
};

export default connect(mapStateToProps)(Landing);
