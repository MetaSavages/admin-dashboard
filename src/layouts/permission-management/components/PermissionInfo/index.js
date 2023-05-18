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
import FormField from 'layouts/permission-management/components/FormField';
import { FormControl } from '@mui/material';
import { ErrorMessage, Field } from 'formik';

function PermissionInfo({ formData, title }) {
  const { formField, values, errors, touched, setFieldValue, isSubmitting } = formData;
  const { action, object } = formField;
  const { action: actionV, object: objectV } = values;

  return (
    <MDBox>
      <MDBox lineHeight={0}>
        <MDTypography variant='h5'>{title}</MDTypography>
      </MDBox>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={24} sm={12}>
            <FormField
              type={action.type}
              label={action.label}
              name={action.name}
              value={actionV}
              placeholder={action.placeholder}
              error={errors.action && touched.action}
              success={actionV.length > 0 && !errors.action}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={24} sm={12}>
            <FormField
              type={object.type}
              label={object.label}
              name={object.name}
              value={objectV}
              placeholder={object.placeholder}
              error={errors.object && touched.object}
              success={objectV.length > 0 && !errors.object}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for UserInfo
PermissionInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
};

export default PermissionInfo;
