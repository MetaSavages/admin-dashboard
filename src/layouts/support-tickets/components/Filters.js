import { Autocomplete, Checkbox, Grid, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MDBox from 'components/MDBox';
import React, { useState, useEffect } from 'react';
import MDButton from 'components/MDButton';
import { useMaterialUIController } from 'context';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const Filters = ({ filters, setFilters }) => {
    
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const [isTaken, setIsTaken] = useState('');
  const [isMyTicket, setIsMyTicket] = useState(false);
  const [isDemoChecked, setIsDemoChecked] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [playerUsernames, setPlayerUsernames] = useState('');

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

    const Types = {
      true: 'Taken',
      false: 'Free',
    };

    const Players = {
      true: 'Demo',
      false: 'non-Demo',
    };

  // Select change handlers

  const handleStatusChange = (event) => {
    const status = event.target.value;
    setSelectedStatus(status);
  };

  const handleReasonChange = (event) => {
    const reason = event.target.value;
    setSelectedReason(reason);
  };

  const handlePlayerChange = (event) => {
    const player = event.target.value;
    setIsDemoChecked(player);
  };

  const handleTypeChange = (event) => {
    const type = event.target.value;
    setIsTaken(type);
  };

  // Checkbox change handlers

  const handleCheckboxMyTicketChange = (event) => {
    const isChecked = event.target.checked;
    setIsMyTicket(isChecked);
  };

  useEffect(() => {
    if (isMyTicket) {
        setIsTaken(true);
    }
    }, [isMyTicket]);

  // Username search handlers

  const updateUsernames = (event) => {
    setPlayerUsernames(event.target.value);
  };

  // Submit handler

  const onSubmit = () => {
    setFilters({
      player: playerUsernames,
      isDemo: isDemoChecked,
      isTaken: isTaken,
      isAdminTicket: isMyTicket,
      status: selectedStatus,
      reason: selectedReason
    });
  };

  function checkActiveButton() {
    return (
      ((filters?.isTaken == undefined && isTaken === false) || isTaken === filters?.isTaken) &&
      ((filters?.isDemo == undefined && isDemoChecked === false) || isDemoChecked === filters?.isDemo) &&
      ((filters?.isAdminTicket == undefined && isMyTicket === false) || isMyTicket === filters?.isAdminTicket) &&
      ((filters?.status == undefined && selectedStatus === '') || selectedStatus === filters?.status) &&
      ((filters?.reason == undefined && selectedReason === '') || selectedReason === filters?.reason) &&
      ((filters?.player == undefined && playerUsernames === '') || playerUsernames === filters?.player)
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
            <TextField
                label='Player username'
                variant='standard'
                value={playerUsernames}
                onChange={updateUsernames}
            />
          </MDBox>
        </Grid>
        <Grid item xs={5} md={6.5}>
          <MDBox sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between' }}>
          <select value={isDemoChecked} onChange={handlePlayerChange} 
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
                <option value=''>Players</option>
                {Object.keys(Players).map(key => (
                    <option key={key} value={key}>{Players[key]}</option>
                ))}
          </select>

          <select value={isTaken} onChange={handleTypeChange} disabled={isMyTicket}
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
                <option value=''>Types</option>
                {Object.keys(Types).map(key => (
                    <option key={key} value={key}>{Types[key]}</option>
                ))}
          </select>

          <select value={selectedReason.key} onChange={handleReasonChange} 
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
        <Grid item xs={5} md={2}>
          <MDBox sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-around' }}>
              <div>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                checked={isMyTicket}
                onChange={(event) => handleCheckboxMyTicketChange(event)}
              />
              <label style={{ fontSize: '14px', color: '#adb3ba', cursor: 'pointer' }}>My Tickets</label>
              </div>
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
