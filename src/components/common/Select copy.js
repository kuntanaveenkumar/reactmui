import React, { useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';
const MySelect = ({ name, label, options, onChange }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const { t } = useTranslation('common');
    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
        onChange(value);
    };
    useEffect(() => {
      
    }, [selectedValue]);
    return (
        <FormControl fullWidth>
            <InputLabel id="select-label">{t(label).toUpperCase()}</InputLabel>
            <Select
                labelId="select-label"
                id={name}
                value={selectedValue}
                onChange={handleChange}
                label={label}
            >
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MySelect;
