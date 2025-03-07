import React from 'react';
import Grid from '@mui/material/Grid';

const MyGrid = ({ children, ...props }) => {
  return (
    <Grid {...props}>
      {children}
    </Grid>
  );
};

export default MyGrid;
