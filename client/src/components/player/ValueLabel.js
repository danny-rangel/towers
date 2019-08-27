import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';

const ValueLabel = ({ children, open, time }) => {
    const popperRef = useRef(null);

    useEffect(() => {
        if (popperRef.current) {
            popperRef.current.update();
        }
    });

    return (
        <Tooltip
            PopperProps={{
                popperRef
            }}
            open={open}
            enterTouchDelay={0}
            placement="top"
            title={time}
        >
            {children}
        </Tooltip>
    );
};

const mapStateToProps = ({ time }) => {
    return { time };
};

export default connect(mapStateToProps)(ValueLabel);
