import { Autocomplete, Checkbox, Grid, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MDBox from 'components/MDBox';
import React, { useState, useEffect } from 'react';
import MDButton from 'components/MDButton';
import { getAllPlayers } from 'services/filters';
import { useSearchParams } from 'react-router-dom';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const Filters = ({ filters, setFilters }) => {
  const [usernameOptions, setUsernameOptions] = useState([]);
  const [usernameInput, setUsernameInput] = useState('');
  const [isDemoChecked, setIsDemoChecked] = useState(false);
  const [isClaimedCodes, setIsClaimedCodes] = useState(false);
  const [playerUsernames, setPlayerUsernames] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

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

  useEffect(() => {
    if (!playerUsernames.length) {
      setFilters({
        users: [],
        isDemo: isDemoChecked,
        isPromoCodeUser: isClaimedCodes
      });
    }
  }, [playerUsernames]);

  useEffect(() => {
    if (searchParams.get('userId')) {
      const nickname = searchParams.get('nickname');
      const userId = searchParams.get('userId');
      const params = {
        id: userId,
        value: userId,
        nickname: nickname,
        label: nickname
      };
      setIsDemoChecked(true);
      setIsClaimedCodes(true);
      setPlayerUsernames([params]);
      setFilters({ users: [params], isDemo: true, isPromoCodeUser: true });
      searchParams.delete('userId');
      searchParams.delete('nickname');
    }
    setSearchParams(searchParams);
  }, [location.search]);

  const updateUsernames = (event, value) => {
    setPlayerUsernames(value);
  };
  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsDemoChecked(isChecked);
  };

  const handleCheckboxCodesChange = (event) => {
    const isChecked = event.target.checked;
    setIsClaimedCodes(isChecked);
  };

  const handleUsernameInput = (event) => {
    setUsernameInput(event.target.value);
    if (event.target.value.length > 2) {
      getAllPlayers(event.target.value, filters?.isDemo).then((players) => {
        setUsernameOptions(players);
      });
    } else if (event.target.value.length < 2) {
      setUsernameOptions([]);
    }
  };

  const onSubmit = () => {
    setFilters({
      users: playerUsernames,
      isDemo: isDemoChecked,
      isPromoCodeUser: isClaimedCodes
    });
  };

  function checkActiveButton() {
    return (
      !playerUsernames.length &&
      ((filters?.isDemo == null && isDemoChecked === false) || isDemoChecked === filters?.isDemo) &&
      ((filters?.isPromoCodeUser == null && isClaimedCodes === false) || isClaimedCodes === filters?.isPromoCodeUser)
    );
  }
  return (
    <MDBox
      sx={{
        width: '100%',
        flexGrow: 1
      }}
    >
      <Grid container spacing={2} justifyContent={'flex-end'}>
        <Grid item xs={12} md={4}>
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
        <Grid item xs={10} md={4} lg={3} xxl={3}>
          <MDBox sx={{ display: 'flex', alignItems: 'center', padding: '2px' }}>
            <MDBox sx={{ display: 'flex', alignItems: 'center', padding: '2px' }}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={isDemoChecked}
                onChange={(event) => handleCheckboxChange(event)}
                sx={{ height: '100%' }}
              />
              <label style={{ fontSize: '14px', color: '#adb3ba', cursor: 'pointer' }}>Demo players</label>
            </MDBox>
            <MDBox sx={{ display: 'flex', alignItems: 'center', padding: '2px' }}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={isClaimedCodes}
                onChange={(event) => handleCheckboxCodesChange(event)}
              />
              <label style={{ fontSize: '14px', color: '#adb3ba', cursor: 'pointer' }}>Claimed codes</label>
            </MDBox>
          </MDBox>
        </Grid>
        <Grid item xs={2} md={2}>
          <MDButton variant='text' disabled={checkActiveButton()} onClick={onSubmit}>
            Apply
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Filters;
