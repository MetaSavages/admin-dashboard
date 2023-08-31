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
import validations from 'layouts/permission-management/schemas/validations';
import form from 'layouts/permission-management/schemas/form';
import { useEffect, useState } from 'react';
import { updatePermission, getPermission } from 'services/permissions';
import { useNavigate, useParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import MDTypography from 'components/MDTypography';
function EditPermession() {
  const { id } = useParams();
  const { formId, formField } = form;
  const [initialValues, setInitalValues] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  useEffect(() => {
    getPermission(id).then((response) => {
      const { data } = response;
      setInitalValues({
        [formField.action.name]: data.action,
        [formField.object.name]: data.object
      });
    });
  }, []);

  const submitForm = async (values, actions) => {
    const response = await updatePermission(id, values.action, values.object);
    if (response.status === 200 || response.status === 201) {
      alert('Permission created successfully');
    } else {
      alert('Permission creation failed1111111111');
    }
    // eslint-disable-next-line no-alert
    actions.setSubmitting(false);
    actions.resetForm();
    navigate('/permission-management');
  };
  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3} mb={20} height='65vh'>
        {initialValues === null ? (
          <Skeleton variant='rectangular' width='100%' height='100%' />
        ) : (
          <Grid container justifyContent='center' alignItems='center' sx={{ height: '100%', mt: 8 }}>
            <Grid item xs={12} lg={8}>
              <Formik initialValues={initialValues} validationSchema={validations} onSubmit={handleSubmit}>
                {({ values, errors, touched, isSubmitting, setFieldValue, validateForm, setStatus }) => (
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
                            title='Edit Permission'
                          />
                          <MDBox mt={2} width='100%' display='flex' justifyContent='space-between'>
                            <MDButton
                              type='button'
                              onClick={async () => {
                                const errs = await validateForm();
                                setStatus(errs);
                                if (!errs?.length) {
                                  handleOpen();
                                }
                              }}
                              variant='gradient'
                              color='dark'
                            >
                              Update
                            </MDButton>
                            <Dialog
                              open={open}
                              onClose={handleClose}
                              aria-labelledby='alert-dialog-title'
                              aria-describedby='alert-dialog-description'
                            >
                              <DialogContent>
                                <MDTypography variant='h6' fontWeight='medium'>
                                  Are you sure you want to update this permission?
                                </MDTypography>
                              </DialogContent>
                              <DialogActions>
                                <MDButton onClick={handleClose} variant='text'>
                                  No
                                </MDButton>
                                <MDButton type='submit' disabled={isSubmitting} form={formId} variant='text'>
                                  Yes
                                </MDButton>
                              </DialogActions>
                            </Dialog>
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </Card>
                  </Form>
                )}
              </Formik>
            </Grid>
          </Grid>
        )}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EditPermession;
