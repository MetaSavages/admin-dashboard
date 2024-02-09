import { Autocomplete, Checkbox, FormControlLabel, Grid, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MDBox from 'components/MDBox';
import React, { useState, useEffect } from 'react';
import MDButton from 'components/MDButton';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { pickersLayoutClasses } from '@mui/x-date-pickers';

import { getAllPlayers, getEventTypes, getAllCountries } from '../../../../services/filters/index';
import { getAllCasinos } from '../../../../services/casinos/index';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const Filters = ({ filters, setFilters, onlyForSpecificUser = false }) => {
  const [open, setOpen] = useState(false);
  const [usernameOptions, setUsernameOptions] = useState([]);
  const [eventTypeOptions, setEventTypeOptions] = useState([]);
  const [casinoOptions, setCasinoOptions] = useState([]);
  const [usernameInput, setUsernameInput] = useState('');
  const [countryOptions, setCountryOptions] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth < 992);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth < 992);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const updateUsernames = (event, value) => {
    setPlayerUsernames(value);
  };

  const updateEventTypes = (event, value) => {
    setEventTypes(value);
  };

  const updateCasinos = (event, value) => {
    setCasinos(value);
  };

  const updateCountries = (event, value) => {
    setCountries(value);
  };

  const handleUsernameInput = (event) => {
    setUsernameInput(event.target.value);
    if (event.target.value.length > 2) {
      getAllPlayers(event.target.value, filters?.demo).then((players) => {
        setUsernameOptions(players);
      });
    } else if (event.target.value.length < 2) {
      setUsernameOptions([]);
    }
  };

  const [eventTypes, setEventTypes] = useState([]);
  const [casinos, setCasinos] = useState([]);
  const [playerUsernames, setPlayerUsernames] = useState([]);
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [countries, setCountries] = useState([]);
  const [demo, setDemo] = useState(false);

  const handleFromChange = (date) => {
    if (to) {
      if (date > to) {
        setFrom(to);
        setTo(date);
      } else {
        setFrom(date);
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
      } else {
        setTo(date);
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

    getAllCountries().then((countries) => {
      setCountryOptions(countries);
    });
  }, []);

  useEffect(() => {
    casinoOptions.forEach((casino) => {
      if (filters?.casinos) {
        filters.casinos.forEach((c) => {
          if (c.id === casino.value) {
            setCasinos((prev) => [...prev, casino]);
          }
        });
      }
    });
  }, [casinoOptions]);

  useEffect(() => {
    if (filters?.users.length) {
      getAllPlayers(filters.users[0].username, filters?.demo).then((res) => {
        res.forEach((username) => {
          if (filters?.users) {
            filters.users.forEach((u) => {
              if (u.id === username.id) {
                setPlayerUsernames((prev) => [...prev, username]);
              }
            });
          }
        });
      });
    }
  }, []);

  useEffect(() => {
    eventTypeOptions.forEach((eventType) => {
      if (filters?.eventTypes) {
        filters.eventTypes.forEach((e) => {
          if (e.id === eventType.id) {
            setEventTypes((prev) => [...prev, eventType]);
          }
        });
      }
    });
  }, [eventTypeOptions]);

  const onSubmit = () => {
    setFilters({
      eventTypes,
      casinos,
      countries,
      users: playerUsernames,
      from,
      to,
      demo
    });
  };

  useEffect(() => {
    countryOptions.forEach((country) => {
      if (filters?.countries) {
        filters.countries.forEach((c) => {
          if (c.name === country) {
            setCountries((prev) => [...prev, country]);
          }
        });
      }
    });
  }, [countryOptions]);

  function timeSection() {
    return (
      <>
        <Grid item xs={12} sm={3} lg={2}>
          <MDBox>
            <DateTimePicker
              label='From'
              ampmInClock={false}
              ampm={false}
              showDaysOutsideCurrentMonth
              format='DD/MM/YYYY hh:mm'
              value={from}
              onChange={handleFromChange}
              sx={{
                width: '100%'
              }}
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
        <Grid item xs={12} sm={3} lg={2}>
          <MDBox>
            <DateTimePicker
              label='To'
              ampmInClock={false}
              ampm={false}
              showDaysOutsideCurrentMonth
              format='DD/MM/YYYY hh:mm'
              value={to}
              onChange={handleToChange}
              sx={{
                width: '100%'
              }}
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
      </>
    );
  }

  return (
    <MDBox
      sx={{
        width: '100%',
        flexGrow: 1
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={4}>
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
              renderInput={(params) => <TextField {...params} label='Event type1' variant='standard' />}
            />
          </MDBox>
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
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
        {isLargeScreen ? <></> : timeSection()}
        <Grid item xs={12} sm={6} lg={4}>
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
              options={countryOptions}
              disableCloseOnSelect
              value={countries}
              onChange={updateCountries}
              isOptionEqualToValue={(option, value) => option === value}
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                  {option}
                </li>
              )}
              renderInput={(params) => <TextField {...params} label='Country' variant='standard' />}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
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

        {isLargeScreen ? timeSection() : <></>}
        <Grid item xs={2} sm={2} md={2}>
          <MDBox>
            <FormControlLabel
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 0,
                marginTop: '2px'
              }}
              control={
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  checked={demo}
                  onClick={() => setDemo(!demo)}
                  name='demo-users-checkbox'
                  id='demo-users-checkbox'
                />
              }
              label={
                <label
                  for='demo-users-checkbox'
                  style={{
                    fontSize: '14px',
                    color: '#9A9CA6'
                  }}
                >
                  {'Enable demo users'}
                </label>
              }
            />
          </MDBox>
        </Grid>
        <Grid item xs={1} md={1} lg={1} ml={3}>
          <MDButton
            variant='text'
            disabled={
              !playerUsernames.length &&
              !eventTypes.length &&
              !from &&
              !to &&
              !casinos.length &&
              !countries.length &&
              demo === filters?.demo
            }
            onClick={onSubmit}
          >
            Apply
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Filters;
