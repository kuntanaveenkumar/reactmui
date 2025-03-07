import React, { useState } from 'react';
import { FormControlLabel, Radio, RadioGroup, InputLabel, FormControl, FormHelperText } from '@mui/material';
import { useTranslation } from 'react-i18next';
function MyRadioGroup({ name, value, onChange, options, error }) {
    const { t } = useTranslation('common');
    const [selectedValue, setSelectedValue] = useState('');
    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedValue(value);
    };
    return (<>
        <FormControl fullWidth error={!!error}>
            <InputLabel id={name}> {t(name).toUpperCase()}</InputLabel>
            <div style={{ marginTop: "40px" }}></div>
            <RadioGroup
                aria-label={name}
                name={name}
                value={value}

            >
                {options.length > 0 ? options && options.map((option) => (
                    <FormControlLabel
                        key={option.value}
                        value={option.value}
                        control={<Radio />}
                        label={option.label}
                        disabled={option.disabled}
                        onChange={(event) => {
                            handleChange(event);
                            onChange(event);
                        }}
                    />
                )) : <FormControlLabel
                    key="0"
                    value="0"
                    control={<Radio />}
                    label="Select"
                    disabled="true"
                />}
            </RadioGroup><br />{error && <FormHelperText sx={{ p: 0, m: 0 }}>{t('login.selectan')} {t(name)}</FormHelperText>}
        </FormControl></>
    );
}
export default MyRadioGroup;
