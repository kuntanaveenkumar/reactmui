
import React from 'react';
import Typography from '@mui/material/Typography';
import "../../css/Typography.less"
const MyTypography = ({ value, size,className }) => {
    return (
        <Typography variant={size} className={className?className:'headingh6'}>
            {value}
        </Typography>
    )
};
export default MyTypography;
