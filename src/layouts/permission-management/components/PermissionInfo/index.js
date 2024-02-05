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

import React, { useEffect, useState } from 'react';

// prop-type is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Grid';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// API calls
import { getPermissionOptions } from 'services/permissions';

function PermissionInfo({ formData, title }) {
  const { formField, values, errors, touched, setFieldValue, isSubmitting } = formData;
  const { action, object } = formField;
  const { action: actionV, object: objectV } = values;
  const [actionOptions, setActionOptions] = useState([]);
  const [objectOptions, setObjectOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const options = (await getPermissionOptions()).data;
        if (options && options.actions && options.objects) {
          setActionOptions(options.actions);
          setObjectOptions(options.objects);
        } else {
          console.log('Something happened: ' + options);
        }
      } catch (error) {
        console.log(error);
        alert('Error fetching permission options');
      }
    };
    
    fetchOptions();
  }, []);
  

  const handleActionChange = (event) => {
    setFieldValue(action.name, event.target.value);
  };

  const handleObjectChange = (event) => {
    setFieldValue(object.name, event.target.value);
  };

  return (
    <MDBox>
      <MDBox lineHeight={0}>
        <MDTypography variant='h5'>{title}</MDTypography>
      </MDBox>
      <MDBox mt={2}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor={action.name} shrink={true}>{action.label}</InputLabel>
              <Select
                value={actionV}
                onChange={handleActionChange}
                error={errors.action && touched.action}
                inputProps={{
                  name: action.name,
                  id: action.name,
                }}
                sx={{ minHeight: '36px', marginTop: '8px' }}
              >
                {actionOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {errors.action && touched.action && <div>{errors.action}</div>}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor={object.name} shrink={true}>{object.label}</InputLabel>
              <Select
                value={objectV}
                onChange={handleObjectChange}
                error={errors.object && touched.object}
                inputProps={{
                  name: object.name,
                  id: object.name,
                }}
                sx={{ minHeight: '36px', marginTop: '8px' }}
              >
                {objectOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {errors.object && touched.object && <div>{errors.object}</div>}
            </FormControl>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

PermissionInfo.propTypes = {
  formData: PropTypes.object.isRequired,
};

export default PermissionInfo;


