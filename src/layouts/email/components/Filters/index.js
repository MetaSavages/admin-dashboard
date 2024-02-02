import { Checkbox, Grid, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MDBox from 'components/MDBox';
import React, { useState } from 'react';
import MDButton from 'components/MDButton';
import MDInput from 'components/MDInput';
import { useEmails } from 'context/emailContext';


import './index.css';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const Filters = ({ filters, setFilters, arrayOfEmails, setArrayOfEmails, setHeaderCheck }) => {
  const [search, setSearch] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { setSelectedEmails } = useEmails();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (arrayOfEmails.length != 0) {
      try {
      setSelectedEmails(arrayOfEmails);
      setFilters(filters.length ? '' : 'd');
      setArrayOfEmails([]);
      alert('Emails saved successfully');
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
    if (isChecked) {
      filter.isChecked = true;
    }
    if (isSubscribed) {
      filter.isSubscribed = true;
    }
    
    setArrayOfEmails([]);
    setHeaderCheck(false);
    setFilters(filter);
  }

  const handleCheckboxChange = (event) => {
    const isCheckedBox = event.target.checked;
    setIsChecked(isCheckedBox);
  };

  const handleCheckboxSub = (event) => {
    const isCheckedBox = event.target.checked;
    setIsSubscribed(isCheckedBox);
  };

  return (
    <MDBox
      sx={{
        width: '100%',
        flexGrow: 1
      }}
    >
      <Grid container spacing={2} justifyContent={'center'} alignItems={'center'}
      sx={{ marginBottom: '-3.5%' }}>
        <Grid item xs={12} lg={12} sx={{ padding: '0 !important' }}>
          <Grid container spacing={2}>
            <form autoComplete='on' onSubmit={handleSubmit} className='form-width-100'>
              <MDBox sx={{ display: 'flex', alignItems: 'center' }}>
                <Grid item xs={6}>
                  <MDBox p={3}>
                    <MDBox display='flex'>
                      <MDInput
                        className='remove-arrows-from-input'
                        type='text'
                        label='Search'
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
                        checked={isSubscribed}
                        onChange={(event) => handleCheckboxSub(event)}
                      />
                      Subscribed
                    </label>
                  </MDBox>
                </Grid>
                <Grid item xs={2}>
                  <MDBox sx={{ display: 'flex', alignItems: 'center', padding: '2px' }}>
                    <label style={{ fontSize: '14px', color: '#adb3ba', cursor: 'pointer' }}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        checked={isChecked}
                        onChange={(event) => handleCheckboxChange(event)}
                      />
                      Demo
                    </label>
                  </MDBox>
                </Grid>
                <Grid item xs={2}>
                  <MDBox ml={2} width='100%' display='flex' justifyContent='space-between'>
                    <MDButton type='submit' variant='gradient' color='info'>
                      Search
                    </MDButton>
                  </MDBox>
                </Grid>
                <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'flex-end' ,alignItems: 'center'}}>
                  <MDButton
                    variant='text'
                    disabled={arrayOfEmails.length > 0 ? false : true}
                    sx={{ width: '140px', color: 'green' }}
                    onClick={onSubmit}
                  >
                    Save Emails
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
