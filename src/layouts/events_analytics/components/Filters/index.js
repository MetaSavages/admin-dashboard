import { Autocomplete, Checkbox, Grid, TextField } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import MDBox from 'components/MDBox';
import React, { useEffect, useState } from 'react';
import MDButton from 'components/MDButton';
import { getEventTypes } from 'services/filters';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

const Filters = ({ filters, setFilters }) => {
  const [open, setOpen] = useState(false);
  const [eventTypeOptions, setEventTypeOptions] = useState([]);
  const [eventTypes, setEventTypes] = useState([]);

  const updateEventTypes = (event, value) => {
    setEventTypes(value);
  };

  useEffect(() => {
    getEventTypes().then((types) => {
      setEventTypeOptions(types);
    });

    eventTypeOptions.forEach((eventType) => {
      if (filters?.event_types) {
        if (filters.event_types.includes(eventType.value)) {
          setEventTypes((prev) => [...prev, eventType]);
        }
      }
    });
  }, []);

  const onSubmit = () => {
    setFilters({
      eventTypes
    });
  };

  return (
    <MDBox
      sx={{
        width: '100%',
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'flex-end'
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'flex-end'
        }}
      >
        <Grid item xs={7} sm={4} md={6}>
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
              onChange={updateEventTypes}
              value={eventTypes}
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

        <Grid item xs={5} md={2}>
          <MDButton variant='text' disabled={!eventTypes.length} onClick={onSubmit}>
            Apply
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default Filters;
