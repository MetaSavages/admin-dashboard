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
import { useState } from 'react';

// @mui material components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDButton from 'components/MDButton';
import MDAlert from 'components/MDAlert';

// Material Dashboard 2 PRO React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'examples/Footer';

// PlayerInfo page components
import PlayerInfo from 'layouts/player-management/PlayerInfo';
import CopyToClipboardButton from 'layouts/player-management/components/CopyToClipboardButton'

// NewUser layout schemas for form and form feilds
import validations from 'layouts/player-management/schemas/validations';
import form from 'layouts/player-management/schemas/form';
import initialValues from 'layouts/player-management/schemas/initialValues';

// Custuom hook for fetching data
import useAxios from 'hooks/useAxios';

function AddPlyer() {
  
  const axiosInstance = useAxios();
  const { formId, formField } = form;
  const currentValidation = validations[0];
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [userId, setUserId] = useState(null);

  const link = process.env.REACT_APP_FRONTEND_URL + '?demoUser=';

  const submitForm = async (values, actions) => {

    try {
      const response = await axiosInstance.post('admin/users/create-demo-user', values)
      const data = response.data;
      if (data) {
        setUserId(data.walletId);
        setAlertVisible(true);
      } 
      console.log(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
        <Grid container justifyContent='center' alignItems='center' sx={{ height: '100%', mt: 8 }}>
          <Grid item xs={12} lg={8}>
            <Formik initialValues={initialValues} validationSchema={currentValidation} onSubmit={handleSubmit}>
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
                          {isAlertVisible && (
                            <MDAlert color='dark'>
                               User's link: <a style={{ color: 'green', textDecoration: 'none' }} href={link + userId}>{link + userId}</a>
                               <CopyToClipboardButton text={link + userId} />
                            </MDAlert>
                          )}
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
  );
}

export default AddPlyer;