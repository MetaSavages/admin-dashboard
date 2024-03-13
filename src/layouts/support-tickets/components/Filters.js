import { Autocomplete, Checkbox, Grid, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MDBox from 'components/MDBox';
import React, { useState, useEffect } from 'react';
import MDButton from 'components/MDButton';
import { getAllPlayers } from 'services/filters';
import { useSearchParams } from 'react-router-dom';
import { useMaterialUIController } from 'context';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const Filters = ({ filters, setFilters }) => {
    
  const [searchParams, setSearchParams] = useSearchParams();
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [usernameOptions, setUsernameOptions] = useState([]);
  const [usernameInput, setUsernameInput] = useState('');
  const [playerUsernames, setPlayerUsernames] = useState([]);

  const [isDemoChecked, setIsDemoChecked] = useState(false);
  const [isMyTicket, setIsMyTicket] = useState(false);
  const [isTaken, setIsTaken] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedReason, setSelectedReason] = useState('');

  const handleStatusChange = (event) => {
    const status = event.target.value;
    setSelectedStatus(status);
  };

  const handleReasonChange = (event) => {
    const reason = event.target.value;
    setSelectedReason(reason);
  };

    const Reasons = {
        kyc: 'Kyc',
        other: 'Other',
        deposit: 'Deposit',
        withdraw: 'Withdraw',
        'promo-code': 'PromoCode'
    };

    const Statuses = {
        initial: 'Initial',
        progress: 'Progress',
        finished: 'Finished'
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
  }, []);

  useEffect(() => {
    if (!playerUsernames.length) {
      setFilters({
        users: [],
        isDemo: isDemoChecked,
        isTaken: isTaken,
        isAdminTicket: isMyTicket,
        status: selectedStatus,
        reason: selectedReason
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
      setPlayerUsernames([params]);
      setFilters({ users: [params], isDemo: true });
      searchParams.delete('userId');
      searchParams.delete('nickname');
    }
    setSearchParams(searchParams);
  }, [location.search]);

  // Checkbox change handlers

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setIsDemoChecked(isChecked);
  };

  const handleCheckboxMyTicketChange = (event) => {
    const isChecked = event.target.checked;
    setIsMyTicket(isChecked);
  };

  const handleCheckboxTakenChange = (event) => {
    const isChecked = event.target.checked;
    setIsTaken(isChecked);
  };

  useEffect(() => {
    if (isMyTicket) {
        setIsTaken(true);
    }
    }, [isMyTicket]);

  // Username autocomplete handlers

  const updateUsernames = (event, value) => {
    setPlayerUsernames(value);
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

  // Submit handler

  const onSubmit = () => {
    setFilters({
      users: playerUsernames,
      isDemo: isDemoChecked,
      isTaken: isTaken,
      isAdminTicket: isMyTicket,
      status: selectedStatus,
      reason: selectedReason
    });
  };

  function checkActiveButton() {
    return (
      !playerUsernames.length &&
      ((filters?.isTaken == null && isTaken === false) || isTaken === filters?.isTaken) &&
      ((filters?.isDemo == null && isDemoChecked === false) || isDemoChecked === filters?.isDemo) &&
      ((filters?.isAdminTicket == null && isMyTicket === false) || isMyTicket === filters?.isAdminTicket) &&
      ((filters?.status == null && selectedStatus === '') || selectedStatus === filters?.status) &&
      ((filters?.reason == null && selectedReason === '') || selectedReason === filters?.reason) 
    );
  }

  return (
    <MDBox
      sx={{
        width: '100%',
        flexGrow: 1
      }}
    >
      <Grid container spacing={2} justifyContent={'space-between'} alignItems={'stretch'}>
        <Grid item xs={5} md={2.5}>
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
                  label='Player username'
                  variant='standard'
                  value={usernameInput}
                  onChange={handleUsernameInput}
                />
              )}
            />
          </MDBox>
        </Grid>
        <Grid item xs={5} md={5}>
          <MDBox sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-around' }}>
            <div>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={isDemoChecked}
                onChange={(event) => handleCheckboxChange(event)}
              />
              <label style={{ fontSize: '14px', color: '#adb3ba', cursor: 'pointer' }}>Demo players</label>
              </div>
              <div>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={isMyTicket}
                onChange={(event) => handleCheckboxMyTicketChange(event)}
              />
              <label style={{ fontSize: '14px', color: '#adb3ba', cursor: 'pointer' }}>My Tickets</label>
              </div>
              <div>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={isTaken}
                onChange={(event) => handleCheckboxTakenChange(event)}
                disabled={isMyTicket}
              />
              <label style={{ fontSize: '14px', color: '#adb3ba', cursor: 'pointer' }}>Taken</label>
              </div>
          </MDBox>
        </Grid>
        <Grid item xs={5} md={3.5}>
          <MDBox sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
          <select value={selectedReason.key} onChange={handleReasonChange} 
                  style={{
                    appearance: 'none',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    padding: '9px 16px',
                    fontSize: '16px',
                    border: '1px solid rgba(128, 128, 128, 0.5)',
                    outline: 'none',
                    width: '50%',
                    color: darkMode ? 'white' : 'black',
                    textAlign: 'center',
                  }}>
                <option value=''>Reason</option>
                {Object.keys(Reasons).map(key => (
                    <option key={key} value={key}>{Reasons[key]}</option>
                ))}
              </select>

              <select value={selectedStatus.key} onChange={handleStatusChange} 
                  style={{
                    margin: '0 0 0 10px',
                    appearance: 'none',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    borderRadius: '8px',
                    padding: '9px 16px',
                    fontSize: '16px',
                    border: '1px solid rgba(128, 128, 128, 0.5)',
                    outline: 'none',
                    width: '50%',
                    color: darkMode ? 'white' : 'black',
                    textAlign: 'center',
                  }}>
                <option value=''>Status</option>
                {Object.keys(Statuses).map(key => (
                    <option key={key} value={key}>{Statuses[key]}</option>
                ))}
              </select>
          </MDBox>
        </Grid>
        <Grid item xs={2} md={1}>
          <MDButton variant='text' disabled={checkActiveButton()} onClick={onSubmit}>
            Apply
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Filters;
