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
import { getRole, updateRole } from 'services/roles';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, Skeleton } from '@mui/material';
import MDTypography from 'components/MDTypography';
import { Can } from 'context';
function EditRole() {
  const { id } = useParams();
  const { formId, formField } = form;
  const currentValidation = validations[0];
  const [initialValues, setInitialValues] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();
  useEffect(() => {
    getRole(id).then((response) => {
      setInitialValues({
        [formField.roleName.name]: response.data.name,
        [formField.rolePermissions.name]: response.data.permissions.map((permission) => {
          return {
            value: permission.id,
            name: `${permission.action}: ${permission.object}`
          };
        }),
        [formField.casino.name]: response.data.casino
      });
    });
    return () => {
      setInitialValues(null);
    };
  }, []);

  const submitForm = async (values, actions) => {
    const response = await updateRole(id, values.roleName, values.rolePermissions, values?.casino ? values.casino : null);
    // eslint-disable-next-line no-alert

    actions.setSubmitting(false);
    actions.resetForm();
    handleClose();
    navigate('/role-management');
  };
  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  return (
    <>
      <Can I='update' a='role'>
        <DashboardLayout>
          <DashboardNavbar />
          <MDBox py={3} mb={20} height='65vh'>
            {initialValues === null ? (
              <Skeleton variant='reactangular' width='100%' height='100%' />
            ) : (
              <Grid container justifyContent='center' alignItems='center' sx={{ height: '100%', mt: 8 }}>
                <Grid item xs={12} lg={8}>
                  <Formik initialValues={initialValues} validationSchema={currentValidation} onSubmit={handleSubmit}>
                    {({ values, errors, touched, isSubmitting, setFieldValue, validateForm, setStatus }) => (
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
                                      Are you sure you want to update this role?
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
      </Can>
      <Can not I='update' a='role'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default EditRole;
