import { Autocomplete, Checkbox, Grid, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MDBox from 'components/MDBox';
import React, { useState, useEffect } from 'react';
import MDButton from 'components/MDButton';
import { getCasinoFilterNames, getCountryFilterNames } from 'services/blacklists';
import { getCurrentUser } from 'services/auth';
const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const Filters = ({ filters, setFilters }) => {
  const [countryOptions, setCountryOptions] = useState([]);
  const [casinoOptions, setCasinoOptions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCountryFilterNames().then((res) => setCountryOptions(res));
    getCasinoFilterNames().then((res) => setCasinoOptions(res));
    getCurrentUser().then((res) => setUser(res));
  }, []);

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

  const onSubmit = () => {
    setFilters({
      country: countries,
      casino: casinos
    });
  };

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
        {!user?.role?.casino && (
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
        )}
        <Grid item md={1}>
          <MDButton variant='text' disabled={!casinos.length && !countries.length} onClick={onSubmit}>
            Apply
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Filters;
