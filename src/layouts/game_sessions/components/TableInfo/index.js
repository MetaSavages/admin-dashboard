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
import FormField from '../FormField';
import { FormControl } from '@mui/material';
import { ErrorMessage, Field } from 'formik';

function TableInfo({ formData, title }) {
  const { formField, values, errors, touched, setFieldValue, isSubmitting } = formData;
  const { min_bet, max_bet } = formField;
  const { min_bet: min_betV, max_bet: max_betV } = values;

  return (
    <MDBox>
      <MDBox lineHeight={0}>
        <MDTypography variant='h5'>{title}</MDTypography>
      </MDBox>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={24} sm={12}>
            <FormField
              type={min_bet.type}
              label={min_bet.label}
              name={min_bet.name}
              value={min_betV}
              placeholder={min_bet.placeholder}
              error={errors.min_bet && touched.min_bet}
              success={min_betV > 0 && !errors.min_bet}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={24} sm={12}>
            <FormField
              type={max_bet.type}
              label={max_bet.label}
              name={max_bet.name}
              value={max_betV}
              placeholder={max_bet.placeholder}
              error={errors.max_bet && touched.max_bet}
              success={max_betV > 0 && !errors.max_bet}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for UserInfo
TableInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
};

export default TableInfo;
