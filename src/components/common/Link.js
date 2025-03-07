import React from 'react';
import { Link as MuiLink } from '@mui/material';
import "../../css/Link.less"
const MyLink = ({ children, ...props }) => {
  return (
    <MuiLink {...props} className='Link'>
      {children}
    </MuiLink>
  );
};

export default MyLink;
