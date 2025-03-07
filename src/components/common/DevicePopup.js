import React, { lazy, useState } from 'react';
import { Button, Popover, Typography, Box, ButtonGroup } from '@mui/material';
const MyButton = lazy(() => import('./Button'));
const MyTypography = lazy(() => import('./Typography'));
import DeleteIcon from '@mui/icons-material/Delete';
import FieldsContainer from './FieldsContainer';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import { useTranslation } from 'react-i18next';

const DeviceConfirmBox = ({ value, type, onConfirm }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { t } = useTranslation('common');
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleSubmit = async (formValue) => {
        console.log(formValue)
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'confirm-popover' : undefined;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const initialValues = {
        deviceId: ""
    };
    const validationSchema = Yup.object().shape({
        deviceId: Yup.string().required()
    });
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

                    <MyTypography value={t('devices.confirmdevicetoremove')} size="h6" />
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, handleChange, handleSubmit }) => (
                            <Form noValidate onSubmit={handleSubmit}>
                                <MyTypography value={t('devices.attentiontext')} size="h6" />
                                <FieldsContainer
                                    fields={[
                                        {
                                            controlId: 'deviceId',
                                            label: 'devices.deviceId',
                                            type: 'text',
                                            name: 'deviceId',
                                            value: values.deviceId,
                                            onChange: handleChange,
                                            error: errors.deviceId
                                        }
                                    ]}
                                />
                                <MyButton label="Cancel" value={value} onClick={handleClose} />&nbsp;&nbsp;
                                <MyButton label="Remove Device" value={value} onClick={(event) => handleSubmit()} />
                            </Form>
                        )}
                    </Formik>

                </Box>
            </Popover>
            <DeleteIcon value={value} onClick={handleClick} />
        </>
    );
};

export default DeviceConfirmBox;
