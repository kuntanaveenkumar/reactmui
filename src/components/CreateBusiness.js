import React, { lazy, Suspense, useCallback, useState, useEffect,useMemo } from 'react';
import { Modal, Box, TextField, Button, Typography, Alert } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
const MyButton = lazy(() => import('./common/Button'));
const MyTypography = lazy(() => import('./common/Typography'));
import Transformtext from "./common/Transformtext"
import { useTranslation } from 'react-i18next';
const FieldsContainer = lazy(() => import('./common/FieldsContainer'));
import { useGenericPostData } from "./hooks/useGenericPostData"
import { usePostBusinessMutation } from './services/business';
import Error from "./common/Error"
import countryList from 'react-select-country-list'
const CreateBusines = ({ open, handleClose, handleReset }) => {
    const { t } = useTranslation('common');
    const [state, setState] = useState({
        message: ""
    });
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '400px',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    const initialValues = {
        name: '',
        address: '',
        state: '',
        city: '',
        country: '',
        zip: ''
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(),
        address: Yup.string().required(),
        state: Yup.string().required(),
        city: Yup.string().required(),
        country: Yup.string().required(),
        zip: Yup.string().required()
    });
    const countryoptions = useMemo(() => countryList().getData(), [])
    const { Submit, isLoading, isSuccess, isError, error, data } = useGenericPostData(usePostBusinessMutation,
        "",
        "",
        state);
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            await Submit("", "", values)
        } catch (err) {
            setState({ ...state, message: "Add Failed" });
        }
    };
    useEffect(() => {
        if (isError) {
            setState({ ...state, message: error.error.message + " " + error.error.failures })
        } else if (isSuccess) {
            handleClose();
            handleReset();
        }
    }, [isError, isSuccess, error, data]);
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <MyTypography value={Transformtext(t('business.createbusiness'))} size="h6" />
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit}>
                            <FieldsContainer
                                fields={[
                                    {
                                        controlId: 'name',
                                        label: 'business.name',
                                        type: 'text',
                                        name: 'name',
                                        value: values.name,
                                        onChange: handleChange,
                                        error: errors.name
                                    },
                                    {
                                        controlId: 'address',
                                        label: 'business.address',
                                        type: 'text',
                                        name: 'address',
                                        value: values.address,
                                        onChange: handleChange,
                                        error: errors.address
                                    },
                                    {
                                        controlId: 'state',
                                        label: 'business.state',
                                        type: 'text',
                                        name: 'state',
                                        value: values.state,
                                        onChange: handleChange,
                                        error: errors.state
                                    },
                                    {
                                        controlId: 'city',
                                        label: 'business.city',
                                        type: 'text',
                                        name: 'city',
                                        value: values.city,
                                        onChange: handleChange,
                                        error: errors.city
                                    },
                                    {
                                        controlId: 'country',
                                        label: 'business.country',
                                        type: 'select',
                                        name: 'country',
                                        value: values.country,
                                        onChange: handleChange,
                                        error: errors.country,
                                        options: countryoptions

                                    },
                                    {
                                        controlId: 'zip',
                                        label: 'business.zip',
                                        type: 'text',
                                        name: 'zip',
                                        value: values.zip,
                                        onChange: handleChange,
                                        error: errors.zip
                                    }
                                ]}
                            />
                            <MyButton type="button" size="medium" variant="contained" label='business.createbusiness'></MyButton>
                            <Error msg={state.message} />
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
};
export default CreateBusiness;
