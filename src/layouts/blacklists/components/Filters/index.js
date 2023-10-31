import { Autocomplete, Checkbox, Grid, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MDBox from 'components/MDBox';
import React, { useState, useEffect } from 'react';
import MDButton from 'components/MDButton';
const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const Filters = ({ filters, setFilters }) => {
  const casinoOptions = [
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

  const countryOptions = [
    {
      label: 'Brazil',
      value: '1'
    },
    {
      label: 'Serbia',
      value: '2'
    },
    {
      label: 'Hungary',
      value: '3'
    },
    {
      label: 'USA',
      value: '4'
    },
    {
      label: 'Canada',
      value: '5'
    },
    {
      label: 'Netherlands',
      value: '6'
    }
  ];

  const updateCasinos = (event, value) => {
    setCasinos(value);
  };

  const updateCountries = (event, value) => {
    setCounries(value);
  };

  const [casinos, setCasinos] = useState([]);
  const [countries, setCounries] = useState([]);

  // fetch options
  useEffect(() => {
    casinoOptions.forEach((casino) => {
      if (filters?.casinos) {
        if (filters.casinos.includes(casino.value)) {
          setCasinos((prev) => [...prev, casino]);
        }
      }
    });

    countryOptions.forEach((country) => {
      if (filters?.country) {
        if (filters.country.includes(country.value)) {
          setCounries((prev) => [...prev, country]);
        }
      }
    });
  }, []);

  return (
    <MDBox
      sx={{
        width: '100%',
        flexGrow: 1
      }}
    >
      <Grid container spacing={2} justifyContent='flex-end'>
        <Grid item sm={4}>
          <MDBox>
            <Autocomplete
              multiple
              limitTags={2}
              options={countryOptions}
              disableCloseOnSelect
              value={countries}
              onChange={updateCountries}
              isOptionEqualToValue={(option, value) => option.value === value.value}
              getOptionLabel={(option) => option.label}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                  {option.label}
                </li>
              )}
              renderInput={(params) => <TextField {...params} label='Country' variant='standard' />}
            />
          </MDBox>
        </Grid>
        <Grid item sm={4}>
          <MDBox>
            <Autocomplete
              multiple
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
        <Grid item md={1}>
          <MDButton variant='text' disabled={!casinos.length}>
            Apply
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Filters;
