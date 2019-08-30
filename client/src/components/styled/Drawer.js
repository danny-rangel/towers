import React from 'react';
import Drawer from '@material-ui/core/Drawer';

const StyledDrawer = ({ drawerOpen, closeDrawer, children }) => {
    const toggleDrawer = event => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        closeDrawer();
    };

    const sideList = () => (
        <div
            onClick={() => toggleDrawer(false)}
            onKeyDown={() => toggleDrawer(false)}
        >
            {children}
        </div>
    );

    return (
        <Drawer
            anchor="right"
            open={drawerOpen}
            onClose={() => toggleDrawer(false)}
        >
            {sideList()}
        </Drawer>
    );
};

export default StyledDrawer;
