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
import InputLabel from '@mui/material/InputLabel';
// NewUser page components
import FormField from 'layouts/user-management/new-user/components/FormField';
import { FormControl } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import MultiSelect from '../MultiSelect';
function RoleInfo({ formData }) {
  const { formField, values, errors, touched, setFieldValue, isSubmitting } = formData;
  const { roleName, rolePermissions } = formField;
  const { roleName: roleNameV, rolePermissions: rolePermissionsV } = values;

  const roleOptions = [
    { value: 'dashboards', name: 'Access dashboards' },
    { value: 'support', name: 'Acess support center' },
    { value: 'sales', name: 'Access sales' },
    { value: 'users', name: 'Access users' },
    { value: 'roles', name: 'Access roles' },
    { value: 'settings', name: 'Access settings' }
  ];
  useEffect(() => {
    if (!isSubmitting) {
      setRolePermissonNames([]);
    }
  }, [isSubmitting]);
  const [rolePermissionNames, setRolePermissonNames] = useState([]);

  const setRolePermissons = (e) => {
    if (rolePermissionNames.find((item) => item.value === e.target.value.at(e.target.value.length - 1)?.value)) {
      setRolePermissonNames(
        rolePermissionNames.filter((item) => item.value !== e.target.value.at(e.target.value.length - 1)?.value)
      );
      setFieldValue(
        rolePermissions.name,
        rolePermissionNames
          .filter((item) => item.value !== e.target.value.at(e.target.value.length - 1)?.value)
          .map((item) => item.value)
      );
    } else {
      setRolePermissonNames([...rolePermissionNames, e.target.value.at(e.target.value.length - 1)]);
      setFieldValue(
        rolePermissions.name,
        [...rolePermissionNames, e.target.value.at(e.target.value.length - 1)].map((item) => item.value)
      );
    }
  };
  return (
    <MDBox>
      <MDBox lineHeight={0}>
        <MDTypography variant='h5'>Create role</MDTypography>
      </MDBox>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={24} sm={12}>
            <FormField
              type={roleName.type}
              label={roleName.label}
              name={roleName.name}
              value={roleNameV}
              placeholder={roleName.placeholder}
              error={errors.roleName && touched.roleName}
              success={roleNameV.length > 0 && !errors.roleName}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={24} sm={12}>
            <MDBox mb={1.5}>
              <FormControl fullWidth size='medium'>
                <InputLabel id='role-permissions-label'>Role Permissions</InputLabel>
                <Field
                  as={MultiSelect}
                  name={rolePermissions.name}
                  label={rolePermissions.label}
                  onChange={setRolePermissons}
                  options={roleOptions}
                  fullWidth
                  labelId='role-permissions-label'
                  multiple
                  multiline
                  variant='standard'
                  value={rolePermissionNames}
                  error={errors.rolePermissions && touched.rolePermissions}
                  success={rolePermissionsV.length > 0 && !errors.rolePermissions}
                  onBlur={() => (touched[rolePermissions.name] = true)}
                />
                <MDBox mt={0.75}>
                  <MDTypography component='div' variant='caption' color='error' fontWeight='regular'>
                    <ErrorMessage name={rolePermissions.name} />
                  </MDTypography>
                </MDBox>
              </FormControl>
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for UserInfo
RoleInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
};

export default RoleInfo;
