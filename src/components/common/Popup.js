import React, { lazy, useState } from 'react';
import { Button, Popover, Typography, Box, ButtonGroup } from '@mui/material';
const MyButton = lazy(() => import('./Button'));
const MyTypography = lazy(() => import('./Typography'));
import DeleteIcon from '@mui/icons-material/Delete';
const ConfirmBox = ({ value, type, onConfirm }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleConfirm = (event, type, value) => {
        if (onConfirm) {
            onConfirm(event, type, value);
        }
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'confirm-popover' : undefined;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
  
    return (
        <>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorPosition={{ top: centerY, left: centerX }}
              
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center',
                }}
            >
                <Box sx={{ p: 2 }} style={{ position: 'relative' }}>
                    <MyTypography value="Are you sure you want to perform this action?" size="16" />
                    <MyButton label="No" value={value} onClick={handleClose} />&nbsp;&nbsp;
                    <MyButton label="Yes" value={value} onClick={(event) => handleConfirm(event, type, value)} />
                </Box>
            </Popover>
            <DeleteIcon value={value} onClick={handleClick} />
        </>
    );
};

export default ConfirmBox;
