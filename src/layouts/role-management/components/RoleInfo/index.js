/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { useEffect, useState } from 'react';
// prop-type is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Grid from '@mui/material/Grid';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import InputLabel from '@mui/material/InputLabel';
// NewUser page components
import FormField from 'layouts/role-management/components/FormField';
import { FormControl } from '@mui/material';
import { ErrorMessage, Field } from 'formik';
import { Autocomplete, TextField, Checkbox } from '@mui/material';
import { getPermissions } from 'services/permissions';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { item } from 'components/Sidenav/styles/sidenavItem';
import { getAllCasinos } from 'services/filters';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

function RoleInfo({ formData }) {
  const { formField, values, errors, touched, setFieldValue, isSubmitting } = formData;
  const { roleName, rolePermissions, casino } = formField;
  const { roleName: roleNameV, rolePermissions: rolePermissionsV, casino: casinoV } = values;
  const [roleOptions, setRoleOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [casinoOptions, setCasinoOptions] = useState([]);
  const [openCasino, setOpenCasino] = useState(false);
  const loading = open && roleOptions.length === 0;

  useEffect(() => {
    getAllCasinos().then((casinos) => {
      casinos.unshift({
        blockChainId: null,
        id: null,
        label: 'All',
        name: 'All',
        provider: null,
        value: null
      });
      setCasinoOptions(casinos);
    });

    if (casinoV === null) {
      setCasinos({
        blockChainId: null,
        id: null,
        label: 'All',
        name: 'All',
        provider: null,
        value: null
      });
    }
  }, []);

  useEffect(() => {
    setFieldValue(
      rolePermissions.name,
      rolePermissionsV.map((item) => {
        return item?.value ? item.value : item;
      })
    );
    getPermissions().then((res) => {
      setRoleOptions(res.data.map((item) => ({ value: item.id, name: `${item.action}: ${item.object}` })));
    });
  }, []);

  const [rolePermissionNames, setRolePermissonNames] = useState(rolePermissionsV);
  const setRolePermissons = (event, value) => {
    setRolePermissonNames(value);
    setFieldValue(
      rolePermissions.name,
      value.map((item) => {
        return item.value;
      })
    );
  };

  const [casinos, setCasinos] = useState(casinoV);
  const handleCasinos = (event, value) => {
    setCasinos(value);
    setFieldValue(casino.name, value.value);
  };

  return (
    <MDBox>
      <MDBox lineHeight={0}>
        <MDTypography variant='h5'>Create role</MDTypography>
      </MDBox>
      <MDBox mt={1.625}>
        <Grid container spacing={3}>
          <Grid item xs={24} sm={12}>
            <FormField
              type={roleName.type}
              label={roleName.label}
              name={roleName.name}
              value={roleNameV}
              placeholder={roleName.placeholder}
              error={errors.roleName && touched.roleName}
              success={roleNameV.length > 0 && !errors.roleName}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={24} sm={12}>
            <MDBox mb={1.5}>
              <Autocomplete
                multiple
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                loading={loading}
                options={roleOptions}
                disableCloseOnSelect
                value={rolePermissionNames}
                onChange={setRolePermissons}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                    {option.name}
                  </li>
                )}
                renderInput={(params) => <TextField {...params} label='Role Permissions' variant='standard' />}
              />
              <MDBox mt={0.75}>
                <MDTypography component='div' variant='caption' color='error' fontWeight='regular'>
                  <ErrorMessage name={rolePermissions.name} />
                </MDTypography>
              </MDBox>
            </MDBox>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={24} sm={12}>
            <MDBox mb={1.5}>
              <Autocomplete
                open={openCasino}
                onOpen={() => {
                  setOpenCasino(true);
                }}
                onClose={() => {
                  setOpenCasino(false);
                }}
                options={casinoOptions}
                disableCloseOnSelect
                value={casinos}
                onChange={handleCasinos}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                    {option.name}
                  </li>
                )}
                renderInput={(params) => <TextField {...params} label='Casino' variant='standard' />}
              />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </MDBox>
  );
}

// typechecking props for UserInfo
RoleInfo.propTypes = {
  formData: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired
};

export default RoleInfo;
