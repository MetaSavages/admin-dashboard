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

// formik components
import { Formik, Form } from 'formik';

// @mui material components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';

// Material Dashboard 2 PRO React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'examples/Footer';

// EditUser page components
import UserInfo from 'layouts/user-management/components/UserInfo';

// EditUser layout schemas for form and form feilds
import validations from 'layouts/user-management/schemas/validations';
import form from 'layouts/user-management/schemas/form';
import initialValues from 'layouts/user-management/schemas/initialValues';

import { getUser } from 'services/users';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';

function EditUser() {
  const { formId, formField } = form;
  const currentValidation = validations[0];
  const [user, setUser] = useState(null);

  const { id } = useParams();
  useEffect(() => {
    getUser(id)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  const submitForm = async (values, actions) => {
    await sleep(1000);

    // eslint-disable-next-line no-alert
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
    actions.resetForm();
  };
  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} mb={20} height='65vh'>
        {user ? (
          <Grid container justifyContent='center' alignItems='center' sx={{ height: '100%', mt: 8 }}>
            <Grid item xs={12} lg={8}>
              <Formik
                initialValues={{
                  firstName: user?.firstName || '',
                  lastName: user?.lastName || '',
                  role: user?.role || '',
                  email: user?.email || '',
                  password: user?.password || '',
                  repeatPassword: user?.repeatPassword || ''
                }}
                validationSchema={currentValidation}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                  <Form id={formId} autoComplete='off'>
                    <Card sx={{ height: '100%' }}>
                      <MDBox p={3}>
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
                            <MDButton disabled={isSubmitting} type='submit' variant='gradient' color='dark'>
                              Send
                            </MDButton>
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </Card>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        ) : (
          <Skeleton variant='rectangular' sx={{ height: '100%', mt: 8 }} />
        )}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EditUser;
