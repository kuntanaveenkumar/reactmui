import React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const StyledDrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const WhiteIconButton = styled(IconButton)({
    color: 'white',
});

const DrawerHeader = ({ children }) => {
    return (
        <StyledDrawerHeader>
            {children}
        </StyledDrawerHeader>
    );
};

export { DrawerHeader, WhiteIconButton };
