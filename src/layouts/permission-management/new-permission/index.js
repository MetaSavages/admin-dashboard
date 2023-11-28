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

// NewUser page components
import PermissionInfo from 'layouts/permission-management/components/PermissionInfo';

// NewUser layout schemas for form and form feilds
import validations from 'layouts/permission-management/components/schemas/validations';
import form from 'layouts/permission-management/components/schemas/form';
import initialValues from 'layouts/permission-management/components/schemas/initialValues';
import { createPermission } from 'services/permissions';
import { Navigate, useNavigate } from 'react-router-dom';
import { Can } from 'context';

function NewPermission() {
  const { formId, formField } = form;
  const navigate = useNavigate();
  const submitForm = async (values, actions) => {
    const response = await createPermission(values.action, values.object);
    if (response.status === 200 || response.status === 201) {
      alert('Permission created successfully');
      navigate('/permission-management');
    } else if (response.status === 400){
      alert(response.data.message);
      actions.setSubmitting(false);
      actions.resetForm();
    } else {
      alert('Permission creation failed');
      actions.setSubmitting(false);
      actions.resetForm();
    }
  };
  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  return (
    <>
      <Can I='create' a='permission'>
        <DashboardLayout>
          <DashboardNavbar />
          <MDBox py={3} mb={20} height='65vh'>
            <Grid container justifyContent='center' alignItems='center' sx={{ height: '100%', mt: 8 }}>
              <Grid item xs={12} lg={8}>
                <Formik initialValues={initialValues} validationSchema={validations} onSubmit={handleSubmit}>
                  {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                    <Form id={formId} autoComplete='off'>
                      <Card sx={{ height: '100%' }}>
                        <MDBox p={3}>
                          <MDBox>
                            <PermissionInfo
                              formData={{
                                values,
                                touched,
                                formField,
                                errors,
                                setFieldValue,
                                isSubmitting
                              }}
                              title='New Permission'
                            />
                            <MDBox mt={2} width='100%' display='flex' justifyContent='space-between'>
                              <MDButton disabled={isSubmitting} type='submit' variant='gradient' color='dark'>
                                Add
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
      <Can not I='create' a='permission'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default NewPermission;
