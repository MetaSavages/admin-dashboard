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
import { useEffect } from 'react';
// prop-type is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Grid from '@mui/material/Grid';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

import FormField from 'layouts/user-management/components/FormField';
import { getRoles } from 'services/roles';

function BlackjackTableInfo({ formData }) {
  const { formField, values, errors, touched } = formData;
  const { casinoName, casinoProvider, minBet, maxBet } = formField;
  const { casinoName: casinoNameV, casinoProvider: casinoProviderV, minBet: minBetV, maxBet: maxBetV } = values;

  useEffect(() => {
    getRoles().then((res) => {
      setRoleOptions(res.data.map((item) => ({ value: item.id, name: item.name })));
    });
  }, []);

  return (
    <MDBox>
      <MDBox lineHeight={0}>
        <MDTypography variant='h5'>Create user</MDTypography>
      </MDBox>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              sx={{ 'background-color': 'transparent !important' }}
              type={casinoName.type}
              label={casinoName.label}
              name={casinoName.name}
              value={casinoNameV}
              placeholder={casinoName.placeholder}
              error={errors.casinoName && touched.casinoName}
              success={casinoNameV.length > 0 && !errors.casinoName}
              disabled={true}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              sx={{ 'background-color': 'transparent !important' }}
              type={casinoProvider.type}
              label={casinoProvider.label}
              name={casinoProvider.name}
              value={casinoProviderV}
              placeholder={casinoProvider.placeholder}
              error={errors.casinoProvider && touched.casinoProvider}
              success={casinoProviderV.length > 0 && !errors.casinoProvider}
              disabled={true}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormField
              type={minBet.type}
              label={minBet.label}
              name={minBet.name}
              value={minBetV}
              placeholder={minBet.placeholder}
              error={errors.minBet && touched.minBet}
              success={minBetV.length > 0 && !errors.minBet}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormField
              type={maxBet.type}
              label={maxBet.label}
              name={maxBet.name}
              value={maxBetV}
              placeholder={maxBet.placeholder}
              error={errors.maxBet && touched.maxBet}
              success={maxBetV.length > 0 && !errors.maxBet}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for UserInfo
BlackjackTableInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
};

export default BlackjackTableInfo;
