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

// services
import { getAllCasinos } from 'services/filters';

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
import { object } from 'prop-types';
function EditRole() {
  const { id } = useParams();
  const { formId, formField } = form;
  const currentValidation = validations[0];
  const [initialValues, setInitialValues] = useState(null);
  const [open, setOpen] = useState(false);
  const [casinos, setCasinos] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getAllCasinos()
      .then((fetchedCasinos) => {
        const modifiedCasinos = fetchedCasinos.map((casino) => ({
          ...casino,
          label: casino.name,
        }));
        modifiedCasinos.unshift({
          blockChainId: null,
          id: null,
          label: 'All',
          name: 'All',
          provider: null,
          value: null,
        });
  
        setCasinos(modifiedCasinos);
  
        getRole(id)
        .then((response) => {
          let selectedCasino = null;
      
          if (response.data.casino) {
            selectedCasino = modifiedCasinos.find((casino) => casino.id === response.data.casino.id) || null;
          }
      
          if (!selectedCasino || !modifiedCasinos.find((casino) => casino.id === selectedCasino.id)) {
            selectedCasino = modifiedCasinos.find((casino) => casino.label === 'All');
          }
      
          setInitialValues({
            [formField.roleName.name]: response.data.name,
            [formField.rolePermissions.name]: response.data.permissions.map((permission) => ({
              value: permission.id,
              name: `${permission.action}: ${permission.object}`,
            })),
            [formField.casino.name]: selectedCasino,
          });
        })
        .catch((error) => {
          console.error('Error fetching role:', error);
        });
      
      })
      .catch((error) => {
        console.error('Error fetching casinos:', error);
      });
  
    return () => {
      setInitialValues(null);
    };
  }, [id, formField.roleName.name, formField.rolePermissions.name, formField.casino.name]);

  const handleSubmit = async (values, actions) => {
    let selectedCasinoId;

    if (values.casino && typeof values.casino === 'object' && values.casino.id) {
      selectedCasinoId = values.casino.id;
    } else if (typeof values.casino === 'string' || typeof values.casino === 'number') {
      selectedCasinoId = values.casino;
    } else {
      selectedCasinoId = null;
    }

    const response = await updateRole(
      id,
      values.roleName,
      values.rolePermissions,
      selectedCasinoId
    );
    
    if (response.status === 200 || response.status === 201) {
      alert('Role edited successfully');
      navigate('/role-management');
    } else {
      alert('Role edit failed');
      actions.setSubmitting(false);
      actions.resetForm();
      handleClose();
    }
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
