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
import validations from 'layouts/user-management/components/schemas/validations';
import form from 'layouts/user-management/components/schemas/form';
import initialValues from 'layouts/user-management/components/schemas/initialValues';

import { getUser, resetUserPasswordAnd2Fa, updateUser, updateUserByAdmin } from 'services/users';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Dialog, DialogActions, DialogContent, Skeleton, Tooltip } from '@mui/material';
import MDTypography from 'components/MDTypography';
import { Can } from 'context';
import UserInfoEdit from '../components/UserInfoEdit';
import validationsEdit from '../components/schemas/validationsEdit';

function EditUser() {
  const { formId, formField } = form;
  const currentValidation = validationsEdit[0];
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [errorReset, setErrorReset] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [openDialogPassword, setOpenDialogPassword] = useState(false);
  const navigate = useNavigate();

  function closeDialogPassword() {
    setErrorReset('');
    setNewPassword('');
    setOpenDialogPassword(false);
  }

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
    try {
      await updateUserByAdmin(user.id, values);
      alert('User edited successfully!');
      actions.resetForm();
      navigate('/user-management');
    } catch (error) {
      alert(error.message);
    }
    actions.setSubmitting(false);
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
                      role: user?.role || '',
                      email: user?.email || ''
                      // password: user?.password || '',
                      // repeatPassword: user?.repeatPassword || ''
                    }}
                    validationSchema={currentValidation}
                    onSubmit={handleSubmit}
                  >
                    {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                      <Form id={formId} autoComplete='off'>
                        <Card sx={{ height: '100%' }}>
                          <MDBox p={3}>
                            <MDBox>
                              <UserInfoEdit
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
