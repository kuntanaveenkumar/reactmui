import React from 'react';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import "../../css/Button.less"
const MyButton = ({ label, onClick, size = null,value = null,className="Button"}) => {
    const { t } = useTranslation('common');
    size = size ? size : "medium"
    return (
        <Button type="submit" size={size} value={value} variant="contained" className={className} onClick={onClick}>
            {t(label)}
        </Button>
    );
};

export default MyButton;
