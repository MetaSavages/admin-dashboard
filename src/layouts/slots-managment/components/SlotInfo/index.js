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
import { Autocomplete, Checkbox, TextField } from '@mui/material';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

function SlotInfo({ formData, title }) {
  const { formField, values, errors, touched, setFieldValue, isSubmitting } = formData;
  const { promoIndex, isUnreal } = formField;
  const { promoIndex: promoIndexV, isUnreal: isUnrealV } = values;

  const [openUnreal, setOpenUnreal] = useState(false);
  const [isUnrealValue, setIsUnrealValue] = useState(isUnrealV);
  const [unrealOptions, setUnrealOptions] = useState([{ name: 'Yes', value: true },{ name: 'No', value: false }]);

  const handleUnreal = (event, value) => {
    setIsUnrealValue(value);
    setFieldValue(isUnreal.name, value);
  };
  console.log(values)
  return (
    <MDBox>
      <MDBox lineHeight={0}>
        <MDTypography variant='h5'>{title}</MDTypography>
      </MDBox>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={24} sm={12}>
            <FormField
              type={promoIndex.type}
              label={promoIndex.label}
              name={promoIndex.name}
              value={promoIndexV}
              placeholder={promoIndex.placeholder}
              error={errors.name && touched.name}
              success={promoIndexV && !errors.name}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={24} sm={12}>
            <MDBox mb={1.5}>
              <Autocomplete
                open={openUnreal}
                onOpen={() => {
                  setOpenUnreal(true);
                }}
                onClose={() => {
                  setOpenUnreal(false);
                }}
                options={unrealOptions}
                disableCloseOnSelect
                value={isUnrealValue}
                onChange={handleUnreal}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                    {option.name}
                  </li>
                )}
                renderInput={(params) => <TextField {...params} label='Is Unreal' variant='standard' />}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for UserInfo
SlotInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
};

export default SlotInfo;
