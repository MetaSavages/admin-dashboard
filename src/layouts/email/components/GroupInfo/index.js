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

// Email page components

import FormField from 'layouts/email/components/FormField';

function GroupInfo({ formData }) {
  const { formField, values, errors, touched, setFieldValue, isSubmitting } = formData;
  const { group } = formField;
  const { group: groupV } = values;

  return (
    <MDBox>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <FormField
              type={group.type}
              label={group.label}
              name={group.name}
              value={groupV}
              placeholder={group.placeholder}
              error={errors.group && touched.group}
              success={groupV?.length > 0 && !errors.group}
            />
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for UserInfo
GroupInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
};

export default GroupInfo;
