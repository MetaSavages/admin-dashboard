import { Select, MenuItem, Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import MDBox from 'components/MDBox';

function MultiSelect({ name, options, success, ...props }) {
  return (
    <Select
      {...props}
      multiple
      renderValue={(selected) => (
        <MDBox sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {selected.map((value) => (
            <Chip key={value.value} label={value.name} />
          ))}
        </MDBox>
      )}
    >
      {options.map((opt) => (
        <MenuItem key={opt.value} value={opt}>
          {opt.name}
        </MenuItem>
      ))}
    </Select>
  );
}

export default MultiSelect;
