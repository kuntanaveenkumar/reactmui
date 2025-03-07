import React from 'react';
import { Box as MuiBox } from '@mui/material';

const MyBox = ({ children, ...props }) => {
    return (
        <MuiBox {...props}>
            {children}
        </MuiBox>
    );
};

export default MyBox;
