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
import FormField from 'layouts/casinos/components/FormField';

function CasinoInfo({ formData, title }) {
  const { formField, values, errors, touched, setFieldValue, isSubmitting } = formData;
  const { name, currency } = formField;
  const { name: nameV, currency: currencyV } = values;
  return (
    <MDBox>
      <MDBox lineHeight={0}>
        <MDTypography variant='h5'>{title}</MDTypography>
      </MDBox>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={24} sm={12}>
            <FormField
              type={name.type}
              label={name.label}
              name={name.name}
              value={nameV}
              placeholder={name.placeholder}
              error={errors.name && touched.name}
              success={nameV && !errors.name}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={24} sm={12}>
            <FormField
              type={currency.type}
              label={currency.label}
              name={currency.name}
              value={currencyV}
              placeholder={currency.placeholder}
              error={errors.currency && touched.currency}
              success={currencyV && !errors.currency}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for UserInfo
CasinoInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
};

export default CasinoInfo;
