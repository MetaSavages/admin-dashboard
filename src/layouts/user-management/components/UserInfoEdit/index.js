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
// prop-type is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Grid from '@mui/material/Grid';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// NewUser page components
import FormField from 'layouts/user-management/components/FormField';
import { Autocomplete } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import MDInput from 'components/MDInput';
import { getRoles } from 'services/roles';

function UserInfoEdit({ formData }) {
  const [roleName, setRoleName] = useState(null);
  const [open, setOpen] = useState(false);
  const [roleOptions, setRoleOptions] = useState([]);
  const loading = open && roleOptions.length === 0;
  const { formField, values, errors, touched, setFieldValue, isSubmitting } = formData;
  const { firstName, lastName, role, email, password, repeatPassword } = formField;
  const {
    firstName: firstNameV,
    lastName: lastNameV,
    email: emailV,
    password: passwordV,
    role: roleV,
    repeatPassword: repeatPasswordV
  } = values;

  useEffect(() => {
    getRoles().then((res) => {
      setRoleOptions(res.data.map((item) => ({ value: item.id, name: item.name })));
    });
    if (roleV) {
      setRoleName({ value: roleV.id, name: roleV.name });
    }
  }, []);

  return (
    <MDBox>
      <MDBox lineHeight={0}>
        <MDTypography variant='h5'>Edit user</MDTypography>
      </MDBox>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={firstName.type}
              label={firstName.label}
              name={firstName.name}
              value={firstNameV}
              placeholder={firstName.placeholder}
              error={errors.firstName && touched.firstName}
              success={firstNameV.length > 0 && !errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={lastName.type}
              label={lastName.label}
              name={lastName.name}
              value={lastNameV}
              placeholder={lastName.placeholder}
              error={errors.lastName && touched.lastName}
              success={lastNameV.length > 0 && !errors.lastName}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <MDBox mb={1.5}>
              <Autocomplete
                loading={loading}
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                options={roleOptions}
                value={roleName}
                onChange={(e, value) => {
                  if (!value) {
                    setFieldValue(role.name, '');
                    setRoleName(null);
                    return;
                  }
                  setFieldValue(role.name, value.value);
                  setRoleName(value);
                }}
                getOptionLabel={(option) => option.name}
                sx={{ width: '100%' }}
                renderInput={(params) => (
                  <Field
                    type={role.type}
                    {...params}
                    as={MDInput}
                    name={role.name}
                    variant='standard'
                    label={role.label}
                    error={errors.role && touched.role}
                    success={roleV.length > 0 && !errors.role}
                    fullWidth
                  />
                )}
              />
              <MDBox mt={0.75}>
                <MDTypography component='div' variant='caption' color='error' fontWeight='regular'>
                  <ErrorMessage name={role.name} />
                </MDTypography>
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={email.type}
              label={email.label}
              name={email.name}
              value={emailV}
              placeholder={email.placeholder}
              error={errors.email && touched.email}
              success={emailV.length > 0 && !errors.email}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for UserInfo
UserInfoEdit.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
};

export default UserInfoEdit;
