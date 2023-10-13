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
import { Formik, Form, ErrorMessage } from 'formik';

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

import validations from 'layouts/blackjack-management/components/schemas/validations';
import form from 'layouts/blackjack-management/components/schemas/form';
import initialValues from 'layouts/blackjack-management/components/schemas/initialValues';
import { Can } from 'context';
import { Navigate, useNavigate } from 'react-router-dom';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import MDTypography from 'components/MDTypography';
import { getCasinos } from 'services/casinos';
import { createBlackjackTable } from 'services/blackjack';

function NewBlackjackTable() {
  const { formId, formField } = form;
  const currentValidation = validations[0];
  const [casinosOptions, setCasinosOptions] = useState([]);
  const loading = casinosOptions.length === 0;
  const navigate = useNavigate();

  useEffect(() => {
    getCasinos()
      .then((res) => {
        if (res?.data?.length > 0) {
          setCasinosOptions(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (values, actions) => {
    const casino = casinosOptions.find((el) => el.casino_name == values.casinoName);
    const casinoId = casino.casino_id;
    try {
      await createBlackjackTable(casinoId);
      alert('You successfully created new table.');
      navigate('/games/blackjack-management');
    } catch (error) {
      alert(`Error: ${error.message}`);
      actions.setSubmitting(false);
      actions.resetForm();
    }
  };

  return (
    <>
      <Can I='create' a='casino'>
        <DashboardLayout>
          <DashboardNavbar />
          <MDBox py={3} mb={20} height='65vh'>
            <Grid container justifyContent='center' alignItems='center' sx={{ height: '100%', mt: 8 }}>
              <Grid item xs={12} lg={8}>
                <Formik initialValues={initialValues} validationSchema={currentValidation} onSubmit={handleSubmit}>
                  {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                    <Form id={formId} autoComplete='off'>
                      <Card sx={{ height: '100%' }}>
                        <MDBox p={3}>
                          <MDBox>
                            <Grid container spacing={3}>
                              <Grid item xs={24} sm={12}>
                                <MDBox mb={1.5}>
                                  <Autocomplete
                                    disablePortal
                                    loading={loading}
                                    options={casinosOptions}
                                    onChange={(event, value) => {
                                      setFieldValue('casinoName', value.casino_name);
                                    }}
                                    getOptionLabel={(option) => option.casino_name}
                                    renderOption={(props, option, { selected }) => (
                                      <li {...props}>{option.casino_name}</li>
                                    )}
                                    renderInput={(params) => {
                                      return <TextField {...params} label='Casino' variant='standard' />;
                                    }}
                                  />
                                  <MDBox mt={0.75}>
                                    <MDTypography component='div' variant='caption' color='error' fontWeight='regular'>
                                      <ErrorMessage name={formField.casinoName} />
                                    </MDTypography>
                                  </MDBox>
                                </MDBox>
                              </Grid>
                            </Grid>
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
          </MDBox>
          <Footer />
        </DashboardLayout>
      </Can>
      <Can not I='create' a='casino'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default NewBlackjackTable;
