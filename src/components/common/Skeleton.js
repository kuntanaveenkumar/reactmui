import Skeleton from '@mui/material/Skeleton';
import React from 'react';
import "../../css/Skeleton.less" 
const MySkeleton = (className) => {
    return (
        <Skeleton variant="rectangular" animation="wave" className={className}/>
    );
};
export default MySkeleton;
