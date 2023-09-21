import { Autocomplete, Checkbox, Grid, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MDBox from 'components/MDBox';
import React, { useState, useEffect } from 'react';
import MDButton from 'components/MDButton';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const Filters = ({ filters, setFilters }) => {
  const [usernameOptions, setUsernameOptions] = useState([]);
  const [walletOptions, setWalletOptions] = useState([]);
  const [usernameInput, setUsernameInput] = useState('');
  const [playerUsernames, setPlayerUsernames] = useState([]);
  const [playerWallets, setPlayerWallets] = useState([]);
  const [isDemoChecked, setIsDemoChecked] = useState(true);

  const updateUsernames = (event, value) => {
    setPlayerUsernames(value);
  };

  const handleUsernameInput = (event) => {
    setUsernameInput(event.target.value);
    if (event.target.value.length > 2) {
      getAllPlayers(event.target.value).then((players) => {
        setUsernameOptions(players);
      });
    } else if (event.target.value.length < 2) {
      setUsernameOptions([]);
    }
  };

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsDemoChecked(isChecked);
  };

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
    walletOptions.forEach((wallet) => {
      if (filters?.wallets) {
        if (filters.wallets.includes(wallet.value)) {
          setPlayerWallets((prev) => [...prev, wallet]);
        }
      }
    });
  }, []);

  useEffect(() => {
    setFilters({
      users: playerUsernames,
      wallets: playerWallets,
      isDemo: isDemoChecked
    });
  }, [playerWallets, playerUsernames, isDemoChecked]);
  
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
              renderInput={ (params) => 
                <TextField
                  {...params}
                  label='Player username'
                  variant='standard'
                  value={usernameInput}
                  onChange={handleUsernameInput}
                />
              }
            />
          </MDBox>
        </Grid>
        <Grid item xs={4} md={4}>
          <MDBox>
            <Autocomplete
              multiple
              limitTags={2}
              options={walletOptions}
              disableCloseOnSelect
              value={playerWallets}
              onChange={setPlayerWallets}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              getOptionLabel={(option) => option.label}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                  {option.label}
                </li>
              )}
              renderInput={(params) => <TextField {...params} label='Wallet Address' variant='standard' />}
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
          <MDButton variant='text' disabled={!playerUsernames.length && !playerWallets.length && !isDemoChecked}>
            Apply
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Filters;
