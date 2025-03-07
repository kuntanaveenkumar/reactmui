import React, { useEffect, useState } from 'react';
import { Select, MenuItem, FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import { useTranslation } from 'react-i18next';
const MySelect = ({ name, label, options, onChange, touched, error }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const { t } = useTranslation('common');
    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
    };
    return (<>
        <FormControl fullWidth error={!!error}>
            <InputLabel id={name}>{t(label).toUpperCase()}</InputLabel>
            <Select
                labelId={name}
                required
                fullWidth
                label={name}
                name={name}
                id={name}
                value={selectedValue}
                onChange={(event) => {
                    handleChange(event);
                    onChange(event);
                }}
                error={touched && Boolean(error)}
                helperText={touched && error}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </Select>{error && <FormHelperText sx={{ p: 0,m: 0 }}>{t('login.selectan')} {t(label)}</FormHelperText>}


        </FormControl><br /><br /></>
    );
};

export default MySelect;
