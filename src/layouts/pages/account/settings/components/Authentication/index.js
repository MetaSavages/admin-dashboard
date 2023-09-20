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

import { useState } from 'react';

// @mui material components
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';
import MDBadge from 'components/MDBadge';
import Dialog2Fa from './components/Dialog2Fa';
import { useMaterialUIController } from 'context';

function Authentication() {
  const [open, setOpen] = useState(false);
  const [controller] = useMaterialUIController();
  const { twoFactor } = controller;

  return (
    <Card id='2fa' sx={{ overflow: 'visible' }}>
      <MDBox display='flex' justifyContent='space-between' alignItems='center' p={3}>
        <MDTypography variant='h5'>Two-factor authentication</MDTypography>
        <MDBadge variant='contained' color='success' badgeContent={twoFactor ? 'enabled' : 'disabled'} container />
      </MDBox>
      <MDBox p={3}>
        <MDBox
          display='flex'
          justifyContent='space-between'
          alignItems={{ xs: 'flex-start', sm: 'center' }}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <MDTypography variant='body2' color='text'>
            {twoFactor ? 'You are already enabled.' : 'Enable 2FA'}
          </MDTypography>
          <MDBox
            display='flex'
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            flexDirection={{ xs: 'column', sm: 'row' }}
          >
            <MDButton variant='outlined' color='dark' size='small' onClick={() => setOpen(true)} disabled={twoFactor}>
              {twoFactor ? 'remove' : 'add'}
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>
      <Dialog2Fa open={open} setOpen={setOpen} />
    </Card>
  );
}

export default Authentication;
