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
import FormField from 'layouts/player-management/FormField';
import { Autocomplete } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import MDInput from 'components/MDInput';
import { getRoles } from 'services/roles';


function PlayerInfo({ formData }) {

  const { formField, values, errors, touched, setFieldValue, isSubmitting } = formData;
  const { nickname } = formField;
  const { nickname: nicknameV } = values;


  return (
    <MDBox>
      <MDBox lineHeight={0}>
        <MDTypography variant='h5'>Create demo player</MDTypography>
      </MDBox>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={nickname.type}
              label={nickname.label}
              name={nickname.name}
              value={nicknameV}
              placeholder={nickname.placeholder}
              error={errors.nickname && touched.nickname}
              success={nicknameV.length > 0 && !errors.nickname}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for UserInfo
PlayerInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
};

export default PlayerInfo;
