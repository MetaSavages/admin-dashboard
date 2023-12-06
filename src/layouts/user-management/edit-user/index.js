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
import form from 'layouts/user-management/components/schemas/form';
import validations from 'layouts/user-management/components/schemas/validations';

import { getUser, resetUserPasswordAnd2Fa, updateUser } from 'services/users';
import { useState, useEffect } from 'react';
import { Navigate, useParams, useNavigate } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, Skeleton, Tooltip } from '@mui/material';
import MDTypography from 'components/MDTypography';
import { Can, useMaterialUIController } from 'context';

function EditUser() {
  const [controller] = useMaterialUIController();
  const { formId, formField } = form;
  const currentValidation = validations[0];
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorReset, setErrorReset] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [openDialogPassword, setOpenDialogPassword] = useState(false);

  function closeDialogPassword() {
    setErrorReset('');
    setNewPassword('');
    setOpenDialogPassword(false);
  }
  const navigate = useNavigate();

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

  const submitForm = async (values, actions) => {
    const result = await updateUser(id, {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      roleId: values.role.value
    });
    if (result.status === 200 || result.status === 201) {
      alert('User updated successfully');
      navigate('/user-management');
    } else if (result.status === 400) {
      alert('Email is not valid or taken by another user');
      actions.resetForm();
    } else {
      alert('User update failed');
      actions.resetForm();
    }
  };
  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };

  async function resetPasswordAnd2Fa() {
    try {
      const result = await resetUserPasswordAnd2Fa(user.id);
      if (result.data.password) {
        setNewPassword(result.data.password);
        setOpenDialogPassword(true);
      }
    } catch (error) {
      setOpenDialogPassword(true);
      setErrorReset(error.message);
    }
    setOpenDialog(false);
  }

  return (
    <>
      <Can I='update' a='user'>
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
                      role: user?.role ? { value: user?.role.id, name: user?.role.name } : '',
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
                                <Can I='update' a='reset-password-and-2fa'>
                                  <Tooltip title='You are about to reset the user password and 2 FA and this action cannot be undone'>
                                    <MDButton
                                      disabled={openDialog}
                                      onClick={() => setOpenDialog(true)}
                                      type='button'
                                      variant='gradient'
                                      color='dark'
                                    >
                                      Reset password and 2fa
                                    </MDButton>
                                  </Tooltip>
                                </Can>
                              </MDBox>
                            </MDBox>
                          </MDBox>
                        </Card>
                      </Form>
                    )}
                  </Formik>
                  <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                  >
                    <DialogContent>
                      <MDTypography variant='h6' fontWeight='medium'>
                        Are you sure you want reset password and 2fa code?
                      </MDTypography>
                    </DialogContent>
                    <DialogActions>
                      <MDButton onClick={() => setOpenDialog(false)} variant='text'>
                        No
                      </MDButton>
                      <MDButton type='button' onClick={resetPasswordAnd2Fa} variant='text'>
                        Yes
                      </MDButton>
                    </DialogActions>
                  </Dialog>
                  <Dialog
                    open={openDialogPassword}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                  >
                    <DialogContent sx={{ 'min-width': '500px' }}>
                      {errorReset ? (
                        <MDTypography
                          sx={{ color: 'red', 'font-size': '18px', 'margin-left': '5px' }}
                          variant='p'
                          fontWeight='medium'
                        >
                          {errorReset}
                        </MDTypography>
                      ) : (
                        <MDTypography sx={{ 'font-weight': '400' }} variant='p' fontWeight='medium'>
                          New password of user{' '}
                          <MDTypography variant='p' fontWeight='medium'>
                            {user.email}
                          </MDTypography>{' '}
                          is:{' '}
                          <MDTypography
                            sx={{ color: 'green', 'font-size': '18px', 'margin-left': '5px' }}
                            variant='p'
                            fontWeight='medium'
                          >
                            {newPassword}
                          </MDTypography>
                        </MDTypography>
                      )}
                    </DialogContent>
                    <DialogActions>
                      <MDButton onClick={closeDialogPassword} variant='text'>
                        Close
                      </MDButton>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
            ) : (
              <Skeleton variant='rectangular' sx={{ height: '100%', mt: 8 }} />
            )}
          </MDBox>
          <Footer />
        </DashboardLayout>
      </Can>
      <Can not I='update' a='user'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default EditUser;
