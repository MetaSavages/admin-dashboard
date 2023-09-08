import { Autocomplete, Checkbox, Grid, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MDBox from 'components/MDBox';
import React, { useState, useEffect } from 'react';
import MDButton from 'components/MDButton';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { pickersLayoutClasses } from '@mui/x-date-pickers';

import { getAllCasinos, getAllPlayers, getEventTypes } from '../../../services/filters/index';
const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const Filters = ({ filters, setFilters }) => {
  const [open, setOpen] = useState(false);
  const [usernameOptions, setUsernameOptions] = useState([]);
  const [eventTypeOptions, setEventTypeOptions] = useState([]);
  const [casinoOptions, setCasinoOptions] = useState([]);
  const [usernameInput, setUsernameInput] = useState('');

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

  const handleUsernameInput = (event) => {
    setUsernameInput(event.target.value);
    if(event.target.value.length > 2) {
      getAllPlayers(event.target.value).then((players) => {
        setUsernameOptions(players);
      });
    } else if(event.target.value.length < 2) {
      setUsernameOptions([]);
    }
  }

  const [eventTypes, setEventTypes] = useState([]);
  const [casinos, setCasinos] = useState([]);
  const [playerUsernames, setPlayerUsernames] = useState([]);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const handleFromChange = (date) => {

    if (to) {
      if (date > to) {
        setFrom(to);
        setTo(date);
      }
       else{
        setFrom(date)
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
      else{
        setTo(date)
      }
    } else {
      setTo(date);
    }
  };

  // fetch options
  useEffect(() => {
    getEventTypes().then((types) => {
      setEventTypeOptions(types);
    });

    getAllCasinos().then((casinos) => {
      setCasinoOptions(casinos);
    });

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
  const onSubmit = () => {
    setFilters({
      eventTypes,
      casinos,
      users: playerUsernames,
      from,
      to
    });
  }
  return (
    <MDBox
      sx={{
        width: '100%',
        flexGrow: 1
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6} sm={4} md={2}>
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
        <Grid item xs={6} sm={4} md={2}>
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
              renderInput={(params) => <TextField {...params} label='Player username' variant='standard' value={usernameInput} onChange={handleUsernameInput} />}
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
        <Grid item xs={3} md={1}>
          <MDButton variant='text' disabled={!playerUsernames.length && !eventTypes.length && !from && !to} onClick={onSubmit}>
            Apply
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Filters;
