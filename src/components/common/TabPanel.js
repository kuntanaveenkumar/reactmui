import React from 'react';
import { Box } from '@mui/material';

const TabPanel = ({ children, value, index }) => {
    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            sx={{ display: value === index ? 'block' : 'none' }}
        >
            {children}
        </Box>
    );
};

export default TabPanel;
