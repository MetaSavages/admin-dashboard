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
import RoleInfo from 'layouts/role-management/components/RoleInfo';

// NewUser layout schemas for form and form feilds
import validations from 'layouts/role-management/components/schemas/validations';
import form from 'layouts/role-management/components/schemas/form';
import initialValues from 'layouts/role-management/components/schemas/initialValues';
import { createRole } from 'services/roles';
import { Navigate, useNavigate } from 'react-router-dom';
import { Can } from 'context';

function NewRole() {
  const { formId, formField } = form;
  const currentValidation = validations[0];
  const navigate = useNavigate();
  const submitForm = async (values, actions) => {
    const response = await createRole(values.roleName, values.rolePermissions, values.casino);
    if (response.status === 200 || response.status === 201) {
      alert('Role created successfully');
      navigate('/role-management');
    } else if (response.status === 400) {
      alert(response.data.message);
      actions.setSubmitting(false);
    } else {
      alert('Role creation failed');
      actions.setSubmitting(false);
    }
  };
  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  return (
    <>
      <Can I='create' a='role'>
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
                            <RoleInfo
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
      <Can not I='create' a='role'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default NewRole;
