import React from 'react';
import { Tabs, Tab } from '@mui/material';
import "../../css/Tab.less"
const MyTabs = ({ value, onChange, onClick, labels, a11yProps }) => {
    const truncateLabel = (label, maxLength) => {
        return label.length > maxLength ? `${label.substr(0, maxLength)}...` : label;
    };
    return (
        <Tabs value={value} onChange={onChange} onClick={onClick}  sx={{
            '& .MuiTabs-indicator': {
                backgroundColor: "#902122",
            },
            '& .MuiTab-root': {
                fontWeight: 'bold',
            },
            '& .MuiTabs-root': {
                minHeight: '155px',
            },
        }} variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example">
            {labels.map((label, index) => (
                <Tab key={index} label={truncateLabel(label.label, 50)} className='Tab' {...a11yProps(index, label.id)} />
            ))}
        </Tabs>
    );
};
export default MyTabs;
