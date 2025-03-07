import React, { lazy, Suspense, useEffect, useState, useCallback } from "react";
import propTypes from "../propTypes/PropTypes"
import Error from "../common/Error"
import Container from '@mui/material/Container';
import { useTranslation } from "react-i18next";
import { Formik, Form } from 'formik';
import * as Yup from "yup";
import FieldsContainer from '../common/FieldsContainer';
import { useAuthMutation } from "../services/auth";
import '../../css/LoginForm.less';
import '../../css/Div.less';
import LanguageToggle from "../hooks/languageToggle"
import MyDivider from "../common/Divider";
import useCookies from "../hooks/cookies";
const CustomCssBaseline = lazy(() => import('../common/CssBaseline'));
const MyButton = lazy(() => import('../common/Button'));
const MyBox = lazy(() => import('../common/Box'));
const LoginForm = ({ auth, initialValues, onSubmit }) => {
  const { t } = useTranslation('common');
  const { getCookies, cleanCookies } = useCookies();
  const [state, setState] = useState({
    email: "",
    password: "",
    cookies: "",
    message: ""
  });
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required(),
    password: Yup.string().required()
  });
  const [authMutation, { isLoading, isSuccess, isError, error, data }] = useAuthMutation();
  const handleLogin = useCallback(async (formValue) => {
    setState({ ...state, message: "" });
    try {
      await authMutation(formValue);
    } catch (err) {
      setState({ ...state, message: "Login Failed" });
    }
  }, [authMutation]);
  useEffect(() => {
    if (isError) {
      setState({ ...state, message: error.message })
    } else if (isSuccess) {
      window.location.href = "./main";
    }
  }, [isError, isSuccess, error, data]);
  return (
    <React.Fragment>
      <CustomCssBaseline />
      <Container maxWidth="sm">
        <Suspense fallback={<div>...</div>}>
          <MyBox className="main-box">
            <Error msg={state.message} />
            <div className="divHeight50"></div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit || handleLogin}
            >
              {({ values, errors, handleChange, handleSubmit }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <FieldsContainer
                    fields={[
                      {
                        controlId: 'email',
                        label: t('login.email'),
                        type: 'text',
                        name: 'email',
                        value: values.email,
                        onChange: handleChange,
                        error: errors.email
                      },
                      {
                        controlId: 'password',
                        label: t('login.password'),
                        type: 'password',
                        name: 'password',
                        value: values.password,
                        onChange: handleChange,
                        error: errors.password
                      }
                    ]}
                  />
                  <Suspense fallback={<div>...</div>}>
                    <MyButton type="submit" size="medium" variant="contained" label={t('leftbar.login')}></MyButton>
                   
                  </Suspense>
                  <div className="divRight"><LanguageToggle /></div>
                </Form>
              )}
            </Formik>
            <MyDivider />
          </MyBox>
        </Suspense>
      </Container>
    </React.Fragment >
  );
};
LoginForm.propTypes = {
  auth: propTypes.authPropTypes
};
export default LoginForm;