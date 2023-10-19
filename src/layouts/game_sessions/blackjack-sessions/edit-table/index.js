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

// NewUser layout schemas for form and form feilds
import validations from 'layouts/game_sessions/components/schemas/validations';
import form from 'layouts/game_sessions/components/schemas/form';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import MDTypography from 'components/MDTypography';
import { Can } from 'context';
import TableInfo from 'layouts/game_sessions/components/TableInfo';
import { getBlackjackTableById } from 'services/tables';

function EditBlackjackTable() {
  const { id } = useParams();
  const { formId, formField } = form;
  const [initialValues, setInitalValues] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  let casinoId = window.location.pathname.split('/')[2];

  useEffect(() => {
    getBlackjackTableById(id).then((response) => {
      const { data } = response;
      setInitalValues({
        [formField.min_bet.name]: data.min_bet,
        [formField.max_bet.name]: data.max_bet
      });
    });
  }, []);

  const submitForm = async (values, actions) => {
    //   const response = await updatePermission(id, values.action, values.object);
    //   if (response.status === 201) {
    //     alert('Permission created successfully');
    //   } else {
    //     alert('Permission creation failed');
    //   }
    //   // eslint-disable-next-line no-alert
    //   actions.setSubmitting(false);
    //   actions.resetForm();
    navigate(`/blackjack-sessions/${casinoId}`);
  };
  const handleSubmit = (values, actions) => {
    submitForm(values, actions);
  };
  return (
    <>
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
                            <TableInfo
                              formData={{
                                values,
                                touched,
                                formField,
                                errors,
                                setFieldValue,
                                isSubmitting
                              }}
                              title={`Edit Blackjack Table`}
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
                                    Are you sure you want to update this table?
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
    </>
  );
}

export default EditBlackjackTable;
