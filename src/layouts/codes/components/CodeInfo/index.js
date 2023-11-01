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
// prop-type is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Grid from '@mui/material/Grid';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
// NewUser page components
import FormField from '../FormField';

function CodeInfo({ formData }) {
  const { formField, values, errors, touched, setFieldValue, isSubmitting } = formData;
  const { count, rolePermissions, casino } = formField;
  const { count: countV, rolePermissions: rolePermissionsV, casino: casinoV } = values;

  return (
    <MDBox>
      <MDBox lineHeight={0}>
        <MDTypography variant='h5'>Create Codes</MDTypography>
      </MDBox>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={24} sm={12}>
            <FormField
              type={count.type}
              label={count.label}
              name={count.name}
              value={countV}
              placeholder={count.placeholder}
              error={errors.count && touched.count}
              success={countV?.length > 0 && !errors?.count}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for CodeInfo
CodeInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
};

export default CodeInfo;
