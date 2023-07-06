import { Autocomplete, Checkbox, Grid, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MDBox from 'components/MDBox';
import React, { useState, useEffect } from 'react';
import MDButton from 'components/MDButton';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const Filters = ({ filters, setFilters }) => {
  const [usernameOptions, setUsernameOptions] = useState([
    {
      label: 'user1',
      value: '1'
    },
    {
      label: 'user2',
      value: '2'
    },
    {
      label: 'user3',
      value: '3'
    },
    {
      label: 'user4',
      value: '4'
    }
  ]);
  const [walletOptions, setWalletOptions] = useState([
    {
      label: 'wallet1',
      value: '1'
    },
    {
      label: 'wallet2',
      value: '2'
    },
    {
      label: 'wallet3',
      value: '3'
    },
    {
      label: 'wallet4',
      value: '4'
    }
  ]);

  const updateUsernames = (event, value) => {
    setPlayerUsernames(value);
  };

  const [playerUsernames, setPlayerUsernames] = useState([]);
  const [playerWallets, setPlayerWallets] = useState([]);

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
      wallets: playerWallets
    });
  }, [playerWallets, playerUsernames]);
  return (
    <MDBox
      sx={{
        width: '100%',
        flexGrow: 1
      }}
    >
      <Grid container spacing={2} justifyContent={'flex-end'}>
        <Grid item xs={5} md={5}>
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
              renderInput={(params) => <TextField {...params} label='Player username' variant='standard' />}
            />
          </MDBox>
        </Grid>
        <Grid item xs={5} md={5}>
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
          <MDButton variant='text' disabled={!playerUsernames.length && !playerWallets.length}>
            Apply
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Filters;
