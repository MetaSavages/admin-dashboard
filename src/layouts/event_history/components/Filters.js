import { Autocomplete, Checkbox, Grid, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MDBox from 'components/MDBox';
import React, { useState, useEffect } from 'react';
import MDButton from 'components/MDButton';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { pickersLayoutClasses } from '@mui/x-date-pickers';
const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const Filters = ({ filters, setFilters }) => {
  console.log(filters);
  const [open, setOpen] = useState(false);
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
  const [eventTypeOptions, setEventTypeOptions] = useState([
    {
      label: 'Login',
      value: '3'
    },
    {
      label: 'Logout',
      value: '4'
    },
    {
      label: 'Deposit',
      value: '1'
    },
    {
      label: 'Withdraw',
      value: '2'
    },
    {
      label: 'Register',
      value: '5'
    },
    {
      label: 'Game Started',
      value: '6'
    }
  ]);

  const casinoOptions = [
    {
      label: 'No casino',
      value: '0'
    },
    {
      label: 'Casino 1',
      value: '1'
    },
    {
      label: 'Casino 2',
      value: '2'
    },
    {
      label: 'Casino 3',
      value: '3'
    },
    {
      label: 'Casino 4',
      value: '4'
    }
  ];

  const setOptions = (value) => {
    console.log(value);
  };

  const updateUsernames = (event, value) => {
    setPlayerUsernames(value);
  };

  const updateEventTypes = (event, value) => {
    setEventTypes(value);
  };

  const updateCasinos = (event, value) => {
    setCasinos(value);
  };

  const [eventTypes, setEventTypes] = useState([]);
  const [casinos, setCasinos] = useState([]);
  const [playerUsernames, setPlayerUsernames] = useState([]);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  console.log(playerUsernames);
  const handleFromChange = (date) => {
    if (to) {
      if (date > to) {
        setFrom(to);
        setTo(date);
      }
    } else {
      setFrom(date);
    }
  };

  const handleToChange = (date) => {
    if (from) {
      if (date < from) {
        setFrom(date);
        setTo(from);
      }
    } else {
      setTo(date);
    }
  };

  // fetch options
  useEffect(() => {
    // fetch event types
    // fetch player usernames
    usernameOptions.forEach((username) => {
      if (filters?.users) {
        if (filters.users.includes(username.value)) {
          setPlayerUsernames((prev) => [...prev, username]);
        }
      }
    });
    eventTypeOptions.forEach((eventType) => {
      if (filters?.event_types) {
        if (filters.event_types.includes(eventType.value)) {
          setEventTypes((prev) => [...prev, eventType]);
        }
      }
    });
    casinoOptions.forEach((casino) => {
      if (filters?.casinos) {
        if (filters.casinos.includes(casino.value)) {
          setCasinos((prev) => [...prev, casino]);
        }
      }
    });
  }, []);

  useEffect(() => {
    setFilters({
      eventTypes,
      users: playerUsernames,
      from,
      to
    });
  }, [eventTypes, playerUsernames, from, to]);
  return (
    <MDBox
      sx={{
        width: '100%',
        flexGrow: 1
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4} sm={4} md={2}>
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

              limitTags={2}
              options={eventTypeOptions}
              disableCloseOnSelect
              value={eventTypes}
              onChange={updateEventTypes}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              getOptionLabel={(option) => option.label}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                  {option.label}
                </li>
              )}
              renderInput={(params) => <TextField {...params} label='Event type' variant='standard' />}
            />
          </MDBox>
        </Grid>
        <Grid item xs={4} sm={4} md={2}>
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

              limitTags={2}
              options={casinoOptions}
              disableCloseOnSelect
              value={casinos}
              onChange={updateCasinos}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              getOptionLabel={(option) => option.label}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                  {option.label}
                </li>
              )}
              renderInput={(params) => <TextField {...params} label='Casino' variant='standard' />}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={4} md={2}>
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
        <Grid item xs={12} sm={4} md={2.5}>
          <MDBox>
            <DateTimePicker
              label='From'
              ampmInClock={false}
              ampm={false}
              showDaysOutsideCurrentMonth
              format='DD/MM/YYYY hh:mm'
              value={from}
              onChange={handleFromChange}
              slotProps={{
                layout: {
                  sx: {
                    [`.${pickersLayoutClasses.actionBar}`]: {
                      display: 'none'
                    }
                  }
                }
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={4} md={2.5}>
          <MDBox>
            <DateTimePicker
              label='To'
              ampmInClock={false}
              ampm={false}
              showDaysOutsideCurrentMonth
              format='DD/MM/YYYY hh:mm'
              value={to}
              onChange={handleToChange}
              slotProps={{
                layout: {
                  sx: {
                    [`.${pickersLayoutClasses.actionBar}`]: {
                      display: 'none'
                    }
                  }
                }
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={1}>
          <MDButton variant='text' disabled={!playerUsernames.length && !eventTypes.length && !from && !to}>
            Apply
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Filters;