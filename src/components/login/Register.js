import React, { lazy, Suspense, useCallback, useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import { useTranslation } from 'react-i18next';
import { DrawerHeader } from '../common/DrawerHeader';
import MySkeleton from '../common/Skeleton';
const MyBox = lazy(() => import('../common/Box'));
const MyButton = lazy(() => import('../common/Button'));
const MyTypography = lazy(() => import('../common/Typography'));
import FieldsContainer from '../common/FieldsContainer';
import { usePostRegisterMutation } from "../services/business"
import { useGenericPostData } from "../hooks/useGenericPostData"
import _, { object } from "underscore";
import Error from "../common/Error";
const Register = () => {
  const { t } = useTranslation('common');
  const [state, setState] = useState({
    message: ""
  });
  const validationSchema = Yup.object().shape({
    email: Yup.string().email(),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Repeat password is required'),
    firstname: Yup.string().required(),
    lastname: Yup.string().required(),
    address: Yup.string().required(),
    phone: Yup.string().required(),
    language: Yup.string().required(),
    emailnotification: Yup.string().required(),
    nfcid: Yup.string()
  });
  const { Submit, isLoading, isSuccess, isError, error, data } = useGenericPostData(usePostRegisterMutation,
    state.register);

  const handleSubmit = async (formValue) => {
    try {
      await Submit(formValue)
      setState({ ...state, message: "" });
    } catch (err) {
      setState({ ...state, message: "Add Failed" });
    }
  };
  useEffect(() => {
    if (isError) {
      setState({ ...state, message: error.message + " " + error.failures })
    } else if (isSuccess) {
      showBranch()
    }
  }, [isSuccess, isError, error, data, state]);

  const initialValues = {
    email: "",
    password: "",
    repeatpassword: "",
    firstname: "",
    lastname: "",
    address: "",
    phone: "",
    language: "",
    emailnotification: "",
    nfcid: ""
  };
  return (
    <MyBox component="main" sx={{ flexGrow: 1, p: 3 }} height={500}>
      <DrawerHeader />
      <div className='divHeight50'></div>
      <Error msg={state.message} />
      <div style={{ height: 200, width: '100%' }}>
        <MyTypography value={t('register.register').toUpperCase()} size="h6" />
        <Suspense fallback={<MySkeleton className="Skeleton100PerBy200" />}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, errors, handleChange, handleSubmit }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Suspense fallback={<MySkeleton className="Skeleton100PerBy200" />}>
                  <FieldsContainer
                    fields={[
                      {
                        controlId: 'email',
                        label: 'register.email',
                        type: 'text',
                        name: 'email',
                        value: values.email,
                        onChange: handleChange,
                        error: errors.email
                      },
                      {
                        controlId: 'password',
                        label: 'register.password',
                        type: 'text',
                        name: 'password',
                        value: values.password,
                        onChange: handleChange,
                        error: errors.password
                      },
                      {
                        controlId: 'repeatpassword',
                        label: 'register.repeatpassword',
                        type: 'text',
                        name: 'repeatpassword',
                        value: values.repeatpassword,
                        onChange: handleChange,
                        error: errors.repeatpassword
                      },
                      {
                        controlId: 'firstname',
                        label: 'register.firstname',
                        type: 'text',
                        name: 'firstname',
                        value: values.firstname,
                        onChange: handleChange,
                        error: errors.firstname
                      },
                      {
                        controlId: 'lastname',
                        label: 'register.lastname',
                        type: 'text',
                        name: 'lastname',
                        value: values.lastname,
                        onChange: handleChange,
                        error: errors.lastname
                      },
                      {
                        controlId: 'address',
                        label: 'register.address',
                        type: 'text',
                        name: 'address',
                        value: values.address,
                        onChange: handleChange,
                        error: errors.address
                      },
                      {
                        controlId: 'phone',
                        label: 'register.phone',
                        type: 'text',
                        name: 'phone',
                        value: values.phone,
                        onChange: handleChange,
                        error: errors.phone
                      },
                      {
                        controlId: 'language',
                        label: 'register.language',
                        type: 'text',
                        name: 'language',
                        value: values.language,
                        onChange: handleChange,
                        error: errors.language
                      },
                      {
                        controlId: 'emailnotification',
                        label: 'register.emailnotification',
                        type: 'text',
                        name: 'emailnotification',
                        value: values.emailnotification,
                        onChange: handleChange,
                        error: errors.emailnotification
                      },
                      {
                        controlId: 'nfcid',
                        label: 'register.nfcid',
                        type: 'text',
                        name: 'nfcid',
                        value: values.nfcid,
                        onChange: handleChange,
                        error: errors.nfcid
                      }
                    ]}
                  />
                </Suspense>
                <Error msg={state.message} />
                <MyButton type="submit" size="medium" variant="contained" label='general.submit'></MyButton>
              </Form>
            )}
          </Formik>
        </Suspense>
      </div>
    </MyBox>
  );
};
export default Register;
