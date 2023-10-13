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
import { useEffect, useState } from 'react';

// @mui material components
import Grid from '@mui/material/Grid';
import { Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Skeleton } from '@mui/material';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';

// NewUser page components
// import FormField from 'layouts/user-management/components/FormField';
import validations from 'layouts/baccarat-management/components/schemas/validations';
import form from 'layouts/baccarat-management/components/schemas/form';

import { Form, Formik } from 'formik';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import BaccaratTableInfo from '../table-info';
import { Can } from 'context';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'examples/Footer';
import { getBaccaratTable, updateBaccaratTable } from 'services/baccarat';
import MDButton from 'components/MDButton';

function EditTable() {
  const { formId, formField } = form;
  const [table, setTable] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const currentValidation = validations[0];
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getBaccaratTable(id)
      .then((res) => {
        setTable(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (values, actions) => {
    setTable({ ...table, minBet: values.minBet, maxBet: values.maxBet });
    setOpenDialog(true);
  };

  const updateTable = async () => {
    try {
      await updateBaccaratTable({ tableId: id, minBet: table.minBet, maxBet: table.maxBet });
      alert('You updated table successfully!');
      navigate('/games/baccarat-management');
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
    setOpenDialog(false);
  };

  return (
    <>
      <Can I='update' a='casino'>
        <DashboardLayout>
          <DashboardNavbar />
          <MDBox py={3} mb={20} height='65vh'>
            {table ? (
              <Grid container justifyContent='center' alignItems='center' sx={{ height: '100%', mt: 8 }}>
                <Grid item xs={12} lg={8}>
                  <Formik
                    initialValues={{
                      casinoName: table?.casino.name || '',
                      casinoProvider: table?.casino.provider || '',
                      minBet: table?.minBet || '',
                      maxBet: table?.maxBet || ''
                    }}
                    validationSchema={currentValidation}
                    onSubmit={handleSubmit}
                  >
                    {({ values, errors, touched, isSubmitting, setFieldValue }) => (
                      <Form id={formId} autoComplete='off'>
                        <Card sx={{ height: '100%' }}>
                          <MDBox p={3}>
                            <MDBox>
                              <BaccaratTableInfo
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
        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{`update table`}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Are you sure you want to update this table?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MDButton variant='text' onClick={() => setOpenDialog(false)}>
              No
            </MDButton>
            <MDButton variant='text' color='error' onClick={updateTable}>
              yes
            </MDButton>
          </DialogActions>
        </Dialog>
      </Can>
      <Can not I='update' a='casino'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default EditTable;
