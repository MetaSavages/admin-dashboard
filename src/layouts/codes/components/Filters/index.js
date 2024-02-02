import { Checkbox, Grid, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MDBox from 'components/MDBox';
import React, { useState } from 'react';
import MDButton from 'components/MDButton';
import { deleteCode } from 'services/codes';
import MDInput from 'components/MDInput';

import './index.css';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const Filters = ({ filters, setFilters, arrayFromCodes, setArrayFromCodes, setHeaderCheck }) => {
  const [search, setSearch] = useState('');
  const [isClaimed, setIsClaimed] = useState(false);
  const onSubmit = async () => {
    if (arrayFromCodes.length > 0) {
      const deletePromises = arrayFromCodes.map((code) => deleteCode(code));
      try {
        const results = await Promise.all(deletePromises);
        alert('Codes deleted successfully');
        setFilters(filters.length ? '' : 'd');
        setArrayFromCodes([]);
      } catch (error) {
        alert(error.message);
      }
    }
  };

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const filter = {};

    if (search) {
      filter.search = search;
    }
    if (isClaimed) {
      filter.isClaimed = true;
    }
    setArrayFromCodes([]);
    setHeaderCheck(false);
    setFilters(filter);
  }

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsClaimed(isChecked);
  };

  return (
    <MDBox
      sx={{
        width: '100%',
        flexGrow: 1
      }}
    >
      <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}
      sx={{ marginBottom: '-3.5%' }} >
        <Grid item xs={12} lg={12} sx={{ padding: '0 !important' }}>
          <Grid container spacing={2}>
            <form autoComplete='off' onSubmit={handleSubmit} className='form-width-100'>
              <MDBox sx={{ display: 'flex', alignItems: 'center', justifyContent:'center' }}>
                <Grid item xs={6}>
                  <MDBox p={3}>
                    <MDBox display='flex'>
                      <MDInput
                        className='remove-arrows-from-input'
                        type='text'
                        label='Code'
                        fullWidth
                        value={search}
                        onChange={handleChange}
                      />
                    </MDBox>
                  </MDBox>
                </Grid>
                <Grid item xs={2}>
                  <MDBox sx={{ display: 'flex', alignItems: 'center', padding: '2px' }}>
                    <label style={{ fontSize: '14px', color: '#adb3ba', cursor: 'pointer' }}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        checked={isClaimed}
                        onChange={(event) => handleCheckboxChange(event)}
                      />
                      Claimed Code
                    </label>
                  </MDBox>
                </Grid>
                <Grid item xs={2}>
                  <MDBox ml={2}>
                    <MDButton type='submit' variant='gradient' color='info'>
                      Search
                    </MDButton>
                  </MDBox>
                </Grid>
                  <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' ,alignItems: 'center'}}>
                    <MDButton
                      variant='text'
                      disabled={arrayFromCodes.length > 0 ? false : true}
                      sx={{ width: '200px', color: '#F44335' }}
                      onClick={onSubmit}
                    >
                      Remove codes
                    </MDButton>
                </Grid>
              </MDBox>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Filters;
