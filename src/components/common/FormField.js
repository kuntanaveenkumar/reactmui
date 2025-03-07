import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormControl, FormLabel, TextField, FormHelperText } from '@mui/material';
const FormField = ({ controlId, label, type, name, value, onChange, error }) => {
  const { t } = useTranslation('common');
  return (
    <FormControl fullWidth error={!!error}>
      <TextField label={t(label).toUpperCase()} variant="outlined" type={type}
        name={name}
        value={value}
        onChange={onChange} error={!!error}/>
      <FormHelperText sx={{ p: 0,m: 0 }}>
        {t('login.pleaseprovidea')} {t(label)}.
      </FormHelperText>
    </FormControl>
  );
};
export default FormField;
