import { Autocomplete, Checkbox, Grid, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MDBox from 'components/MDBox';
import React, { useState, useEffect } from 'react';
import MDButton from 'components/MDButton';
import { getAllPlayers } from 'services/filters';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const Filters = ({ filters, setFilters }) => {
  const [usernameOptions, setUsernameOptions] = useState([]);
  const [usernameInput, setUsernameInput] = useState('');
  const [isDemoChecked, setIsDemoChecked] = useState(false);
  const updateUsernames = (event, value) => {
    setPlayerUsernames(value);
  };
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsDemoChecked(isChecked);
  };

  const [playerUsernames, setPlayerUsernames] = useState([]);
  // fetch options
  useEffect(() => {
    // fetch player usernames
    usernameOptions.forEach((username) => {
      if (filters?.users) {
        if (filters.users.includes(username.value)) {
          setPlayerUsernames((prev) => [...prev, username]);
        }
      }
    });
  }, []);

  const onSubmit = () => {
    setFilters({
      users: playerUsernames,
      isDemo: isDemoChecked
    });
  };
  return (
    <MDBox
      sx={{
        width: '100%',
        flexGrow: 1
      }}
    >
      <Grid container spacing={2} justifyContent={'flex-end'}>
        <Grid item xs={4} md={4}>
          <MDBox>
            <Autocomplete
              multiple
              limitTags={2}
              options={usernameOptions}
              disableCloseOnSelect
              value={playerUsernames}
              onChange={updateUsernames}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              getOptionLabel={(option) => option.label}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                  {option.label}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label='Player username or Wallet ID'
                  variant='standard'
                  value={usernameInput}
                  onChange={handleUsernameInput}
                />
              )}
            />
          </MDBox>
        </Grid>
        <Grid item xs={2} md={2}>
          <MDBox>
            <label>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={isDemoChecked}
                onChange={(event) => handleCheckboxChange(event)}
              />
              Demo
            </label>
          </MDBox>
        </Grid>
        <Grid item xs={2} md={2}>
          <MDButton variant='text' disabled={!playerUsernames.length && !isDemoChecked}>
            Apply
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Filters;
