import { useState } from 'react';

import API from 'api';
import RectangularButton from 'components/atoms/buttons/RectangularButton';
import LoginLayout from 'components/layouts/LoginLayout';
import FormikInput from 'components/molecules/textfields/FormikInput';
import { useGlobalContext } from 'context/globalContext';
import { Form, Formik } from 'formik';
import { shallowEqual } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { alertActions } from 'redux/actions';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import * as Yup from 'yup';

import { Typography } from '@mui/material';

import useStyles from './styles';

export type LoginInitialValuesTYPE = {
    username: string;
    password: string;
};

const loginInitialValues = {
    username: '',
    password: ''
};

const loginValidationSchema = Yup.object().shape({
    username: Yup.string().required('This field is required'),
    password: Yup.string().required('This field is required')
});

const Login: React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const { dispatchContext } = useGlobalContext();
    // shallowEqual to prevent rerender on every store update
    const alert = useAppSelector(state => state.alert, shallowEqual);
    const dispatch = useAppDispatch();
    console.log(alert);

    const [IsLoading, setIsLoading] = useState(false);

    const handleLogin = async (values: LoginInitialValuesTYPE) => {
        setIsLoading(true);
        await API.post('user/login', values)
            .then(res => {
                localStorage.setItem('access_token', res.data.access_token);
                history.push('/dashboard');
            })
            .catch(err => {
                setIsLoading(false);
                dispatch(alertActions.open('error', err?.response?.data?.message ?? 'Undefined error'));
                // dispatchContext({
                //     type: OPEN_ALERT,
                //     message: err?.response?.data?.message ?? 'Undefined error',
                //     variant: 'error'
                // });
            });
    };

    const setInitErrors = () => {
        return {
            username: 'This field is required',
            password: 'This field is required'
        };
    };

    return (
        <LoginLayout>
            <div className={classes.content}>
                <Typography component="h1" variant="h1" style={{ fontSize: '2.6rem', marginBottom: '3rem' }}>
                    {'Sign in'}
                </Typography>

                <Formik
                    initialValues={loginInitialValues}
                    validationSchema={loginValidationSchema}
                    initialErrors={setInitErrors()}
                    onSubmit={handleLogin}
                >
                    {formProps => (
                        <Form className={classes.form}>
                            <div>
                                <FormikInput showError name="username" label="Login" fullWidth />
                                <FormikInput showError name="password" type="password" label="Password" fullWidth />
                            </div>
                            <RectangularButton
                                text="Sign in"
                                type="submit"
                                fullWidth
                                color="secondary"
                                loading={IsLoading}
                                disabled={formProps.isSubmitting || !formProps.isValid}
                            />
                            {/* <div className={classes.formLinks}>
                                <Link
                                    href="#"
                                    variant="body2"
                                    //temporary disabled
                                    style={{
                                        color: "grey",
                                        pointerEvents: "none"
                                    }}
                                >
                                    {t("info.Forgot password?")}
                                </Link>
                                <Link
                                    href="#"
                                    variant="body2"
                                    //temporary disabled
                                    style={{
                                        color: "grey",
                                        pointerEvents: "none"
                                    }}
                                >
                                    {t("info.Don't have an account? Sign Up")}
                                </Link>
                            </div> */}
                            {/* <ReCAPTCHA
                                ref={recaptchaRef}
                                size="invisible"
                                sitekey={process.env.REACT_APP_CAPTCHA_KEY as string}
                                onExpired={() => recaptchaRef?.current?.reset()}
                                onErrored={() => recaptchaRef?.current?.reset()}
                            /> */}
                        </Form>
                    )}
                </Formik>
            </div>
        </LoginLayout>
    );
};

export default Login;
