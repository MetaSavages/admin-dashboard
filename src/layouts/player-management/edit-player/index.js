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

// EditPlayer page components
import PlayerInfo from 'layouts/player-management/components/PlayerInfo';

// EditPlayer layout schemas for form and form feilds
import validations from 'layouts/player-management/components/schemas/validations';
import form from 'layouts/player-management/components/schemas/form';
import initialValues from 'layouts/player-management/components/schemas/initialValues';

import { useState, useEffect } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';

import { getPlayerWithoutParams, updatePlayerName } from 'services/players';
import { Can } from 'context';

function EditPlyer() {
  const { formId, formField } = form;
  const currentValidation = validations[0];
  const [user, setUser] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();
  useEffect(() => {
    let params = { isDemo: false };
    if (searchParams.get('isDemo')) {
      params.isDemo = true;
    } else if (searchParams.get('isPromoCodeUser')) {
      params.isPromoCodeUser = true;
    }

    getPlayerWithoutParams(id, params)
      .then((res) => {
        if (res) {
          setUser(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitForm = async (values, actions) => {
    updatePlayerName(id, values.nickname);
    actions.setSubmitting(false);
  };
  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  return (
    <>
      <Can I='update' a='player'>
        <DashboardLayout>
          <DashboardNavbar />
          <MDBox py={3} mb={20} height='65vh'>
            {user ? (
              <Grid container justifyContent='center' alignItems='center' sx={{ height: '100%', mt: 8 }}>
                <Grid item xs={12} lg={8}>
                  <Formik
                    initialValues={{
                      nickname: user?.nickname || ''
                    }}
                    validationSchema={currentValidation}
                    onSubmit={handleSubmit}
                  >
                    {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                      <Form id={formId} autoComplete='off'>
                        <Card sx={{ height: '100%' }}>
                          <MDBox p={3}>
                            <MDBox>
                              <PlayerInfo
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
      </Can>
      <Can not I='update' a='player'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default EditPlyer;
