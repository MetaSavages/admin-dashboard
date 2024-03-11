import { Checkbox, Grid, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MDBox from 'components/MDBox';
import React, { useState } from 'react';
import MDButton from 'components/MDButton';
import { deleteCode } from 'services/codes';
import MDInput from 'components/MDInput';

import './index.css';
import { useMaterialUIController } from 'context';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const Filters = ({ filters, setFilters, arrayFromCodes, setArrayFromCodes, setHeaderCheck }) => {
  const [search, setSearch] = useState('');
  const [isClaimed, setIsClaimed] = useState(false);
  const [openDialogRemoveAllCodes, setOpenDialogRemoveAllCodes] = useState(false);
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;

  const onSubmit = async () => {
    if (arrayFromCodes.length > 0) {
      const deletePromises = arrayFromCodes.map((code) => deleteCode(code));
      try {
        const results = await Promise.all(deletePromises);
        alert('Codes deleted successfully');
        setFilters(filters.length ? '' : 'd');
        setArrayFromCodes([]);
        setHeaderCheck(false);
      } catch (error) {
        alert(error.message);
      }
      handleCloseRemoveAllCodesDialog();
    }
  };

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit() {
    // e.preventDefault();
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

  const handleCloseRemoveAllCodesDialog = () => {
    setOpenDialogRemoveAllCodes(false);
  };

  function disabledSearchButton() {
    return (
      ((filters?.isClaimed == null && isClaimed === false) || isClaimed === filters?.isClaimed) &&
      ((filters?.search == null && search?.length <= 0) || search === filters?.search)
    );
  }

  return (
    <MDBox
      sx={{
        width: '100%',
        marginTop: '20px'
      }}
    >
      <Grid container spacing={2} justifyContent={'space-between'}>
        <Grid item xs={12} sm={6} lg={6} md={6}>
          <MDBox>
            <MDInput
              className='remove-arrows-from-input'
              type='text'
              label='Code'
              fullWidth
              value={search}
              onChange={handleChange}
            />
          </MDBox>
        </Grid>
        <Grid item xs={5} lg={2} sm={2.5} md={2}>
          <MDBox sx={{ display: 'flex', alignItems: 'center', padding: '2px' }}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              checked={isClaimed}
              onChange={(event) => handleCheckboxChange(event)}
              sx={{ paddingLeft: '0px' }}
            />
            <label style={{ fontSize: '14px', color: '#adb3ba', cursor: 'pointer' }}>Claimed Code</label>
          </MDBox>
        </Grid>
        <Grid item xs={4} lg={2} sm={2} md={2} sx={{ margin:'auto' }}>
          <MDBox ml={2} width='100%' display='flex'>
            <MDButton variant='text' disabled={disabledSearchButton()} onClick={() => handleSubmit()}>
              Search
            </MDButton>
          </MDBox>
        </Grid>

        <Grid item xs={12} lg={2} md={2}>
          <MDButton
            variant='outlined'
            color={darkMode ? 'white' : 'grey'}
            disabled={arrayFromCodes.length > 0 ? false : true}
            sx={{ width: '100%', color: '#F44335' }}
            onClick={() => setOpenDialogRemoveAllCodes(true)}
          >
            Remove codes
          </MDButton>
        </Grid>
      </Grid>
      <Dialog
        open={openDialogRemoveAllCodes}
        onClose={handleCloseRemoveAllCodesDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{`Delete promo codes`}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete all promo codes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MDButton variant='text' onClick={handleCloseRemoveAllCodesDialog}>
            No
          </MDButton>
          <MDButton variant='text' color='error' onClick={() => onSubmit()}>
            yes
          </MDButton>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
};

export default Filters;
