import { Autocomplete, Checkbox, Grid, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MDBox from 'components/MDBox';
import React, { useState } from 'react';
import MDButton from 'components/MDButton';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const Filters = () => {
  const [open, setOpen] = useState(false);
  const options = ['Option 1', 'Option 2'];
  const setOptions = (value) => {
    console.log(value);
  };
  return (
    <MDBox
      sx={{
        width: '100%',
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'flex-end'
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'flex-end'
        }}
      >
        <Grid item xs={4} sm={4} md={5}>
          <MDBox>
            <Autocomplete
              multiple
              //   open={open}
              //   onOpen={() => {
              //     setOpen(true);
              //   }}
              //   onClose={() => {
              //     setOpen(false);
              //   }}
              options={options}
              disableCloseOnSelect
              //   value={rolePermissionNames}
              onChange={setOptions}
              isOptionEqualToValue={(option, value) => option === value}
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                  {option}
                </li>
              )}
              renderInput={(params) => <TextField {...params} label='Event type' variant='standard' />}
            />
          </MDBox>
        </Grid>

        <Grid item xs={2} md={1}>
          <MDButton variant='text'>Apply</MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Filters;
