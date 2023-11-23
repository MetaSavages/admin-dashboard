import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Grid from '@mui/material/Grid';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
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
          console.log('Something happend: ' + options);
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


