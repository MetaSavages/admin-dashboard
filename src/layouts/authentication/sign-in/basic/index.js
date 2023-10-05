/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';
import { Formik, Form } from 'formik';
// Authentication layout components
import BasicLayout from 'layouts/authentication/components/BasicLayout';
import UserInfo from 'layouts/authentication/sign-in/basic/components/SignInForm';
import initialValues from 'layouts/authentication/sign-in/basic/schemas/initialValues';
import validations from 'layouts/authentication/sign-in/basic/schemas/validations';
import form from 'layouts/authentication/sign-in/basic/schemas/form';
import { login, getCurrentUser } from 'services/auth';
// Images
import bgImage from 'assets/images/bg-sign-in-basic.jpeg';
import { setName, setEmail, setRole, useMaterialUIController, setAbility, setTwoFactor } from 'context';
import { getUserAbilities } from 'config/ability';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MDInput from 'components/MDInput';
import { login2Fa, turnOn2Fa } from 'services/2fa';

import { useCookies } from 'react-cookie';

function Basic() {
  const [, dispatch] = useMaterialUIController();
  const [isTwoFactor, setIsTwoFactor] = useState(false);
  const [code, setCode] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [cookie, setCookie] = useCookies(['access_token']);
  const handleSubmit = (values, actions) =>
    login(values.email, values.password)
      .then((res) => {
        console.log(res);
        setCookie('access_token', res?.data?.access_token, { path: '/' });
        actions.setSubmitting(false);
        actions.resetForm();
        getCurrentUser().then((res) => {
          if (res.isTwoFactorAuthenticationEnabled) {
            setIsTwoFactor(res.isTwoFactorAuthenticationEnabled);
          } else {
            serUserData(res);
          }
        });
      })
      .catch((err) => {
        console.log(err);
        alert('Email or password is incorrect');
        console.log(err);
        actions.setSubmitting(false);
        actions.resetForm();
      });
  const navigate = useNavigate();

  function serUserData(user) {
    setName(dispatch, `${user.firstName} ${user.lastName}`);
    setEmail(dispatch, user.email);
    setTwoFactor(dispatch, user.isTwoFactorAuthenticationEnabled);
    setRole(dispatch, user.role); // no role yet
    setAbility(dispatch, getUserAbilities(user.role));
    navigate('/dashboard', { replace: true });
  }

  function handleChange(e) {
    const currentCode = e.target.value;

    if (currentCode.length <= 6) {
      setCode(currentCode);

      if (errorCode) {
        setErrorCode('');
      }
    }
  }

  async function handleSubmitCode(e) {
    e.preventDefault();
    if (code?.length < 6) {
      return;
    }
    try {
      const result = await login2Fa(code);
      if (result.status == 200) {
        result.access_token && localStorage.setItem('AccessToken', res.access_token);
        getCurrentUser()
          .then((user) => {
            serUserData(user);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      setErrorCode('INCORRECT AUTHENTICATION CODE!');
    }
  }
  const { formId, formField } = form;
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant='gradient'
          bgColor='info'
          borderRadius='lg'
          coloredShadow='info'
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign='center'
        >
          <MDTypography variant='h4' fontWeight='medium' color='white' mt={1}>
            {isTwoFactor ? '2FA Code' : 'Sign in'}
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Grid container justifyContent='center' alignItems='center' sx={{ height: '100%' }}>
            <Grid item xs={12} lg={8}>
              {isTwoFactor ? (
                <Formik>
                  {() => (
                    <Form id='2fa' autoComplete='off'>
                      <MDBox className='remove-arrows-from-input'>
                        <MDInput
                          type='number'
                          label='Code'
                          fullWidth
                          value={code}
                          onChange={handleChange}
                          error={errorCode ? true : false}
                        />
                        <MDBox mt={0.75}>
                          <MDTypography component='div' variant='caption' color='error' fontWeight='regular'>
                            {errorCode}
                          </MDTypography>
                        </MDBox>
                        <MDBox mt={2} width='100%' display='flex' justifyContent='space-between'>
                          <MDButton
                            disabled={code?.length >= 6 ? false : true}
                            onClick={handleSubmitCode}
                            type='submit'
                            variant='gradient'
                            color='info'
                            fullWidth
                          >
                            Submit
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    </Form>
                  )}
                </Formik>
              ) : (
                <Formik initialValues={initialValues} validationSchema={validations} onSubmit={handleSubmit}>
                  {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                    <Form id={formId} autoComplete='off'>
                      <MDBox>
                        <UserInfo
                          formData={{
                            values,
                            touched,
                            formField,
                            errors,
                            setFieldValue,
                            isSubmitting
                          }}
                        />
                        <MDBox mt={2} width='100%' display='flex' justifyContent='space-between'>
                          <MDButton disabled={isSubmitting} type='submit' variant='gradient' color='info' fullWidth>
                            Sign in
                          </MDButton>
                        </MDBox>
                      </MDBox>
                    </Form>
                  )}
                </Formik>
              )}
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
