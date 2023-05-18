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
import { setUser, setRole, useMaterialUIController } from 'context';
import { useNavigate } from 'react-router-dom';
function Basic() {
  console.log('Basic');
  const [, dispatch] = useMaterialUIController();
  const handleSubmit = (values, actions) =>
    login(values.email, values.password)
      .then((res) => {
        console.log(res);
        actions.setSubmitting(false);
        actions.resetForm();
        getCurrentUser().then((res) => {
          console.log(res);
          setUser(dispatch, res.data.email);
          setRole(dispatch, res.data.role); // no role yet
          navigate('/dashboard', { replace: true });
        });
      })
      .catch((err) => {
        alert('Email or password is incorrect');
        actions.setSubmitting(false);
        actions.resetForm();
      });
  const navigate = useNavigate();
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
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <Grid container justifyContent='center' alignItems='center' sx={{ height: '100%' }}>
            <Grid item xs={12} lg={8}>
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
            </Grid>
          </Grid>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
