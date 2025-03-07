import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

const MyList = ({ children, ...props }) => {
  return (
    <List {...props}>
      {children}
    </List>
  );
};

const MyListItem = ({ children, ...props }) => {
  return (
    <ListItem {...props}>
      {children}
    </ListItem>
  );
};

const MyListItemButton = ({ children, ...props }) => {
  return (
    <ListItemButton {...props}>
      {children}
    </ListItemButton>
  );
};

const MyListItemIcon = ({ children, ...props }) => {
  return (
    <ListItemIcon {...props}>
      {children}
    </ListItemIcon>
  );
};

const MyListItemText = ({ children, ...props }) => {
  return (
    <ListItemText {...props}>
      {children}
    </ListItemText>
  );
};

export { MyList, MyListItem, MyListItemButton, MyListItemIcon, MyListItemText };
