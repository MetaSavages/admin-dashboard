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

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';
import MDBadge from 'components/MDBadge';
import Add2FaDialog from './components/Add2FaDialog';
import { setTwoFactor, useMaterialUIController } from 'context';
import { remove2Fa } from 'services/2fa';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Remove2FaDialog from './components/Remove2FaDialog';

function Authentication() {
  const [openAdd2FaCode, setOpenAdd2FaCode] = useState(false);
  const [openRemove2FaCode, setOpenRemove2FaCode] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [controller, dispatch] = useMaterialUIController();
  const { twoFactor } = controller;
  const [disabledButton, setDisabledButton] = useState(false);

  async function remove2faCode() {
    setDisabledButton(true);
    try {
      const result = await remove2Fa();
      setTwoFactor(dispatch, result.isTwoFactorAuthenticationEnabled);
      setDisabledButton(false);
      setOpenRemoveDialog(false);
    } catch (error) {
      console.log(error);
    }
  }

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
            {twoFactor ? (
              <MDButton variant='outlined' color='dark' size='small' onClick={() => setOpenRemoveDialog(true)}>
                remove
              </MDButton>
            ) : (
              <MDButton
                variant='outlined'
                color='dark'
                size='small'
                onClick={() => setOpenAdd2FaCode(true)}
                disabled={disabledButton}
              >
                add
              </MDButton>
            )}
          </MDBox>
        </MDBox>
        <Dialog
          open={openRemoveDialog}
          onClose={() => setOpenRemoveDialog(false)}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{`Remove 2FA`}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Are you sure you want to remove 2FA protection?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <MDButton variant='text' onClick={() => setOpenRemoveDialog(false)}>
              No
            </MDButton>
            <MDButton
              variant='text'
              color='error'
              onClick={() => {
                setOpenRemove2FaCode(true);
                setOpenRemoveDialog(false);
                // remove2faCode();
              }}
            >
              yes
            </MDButton>
          </DialogActions>
        </Dialog>
      </MDBox>
      <Add2FaDialog open={openAdd2FaCode} setOpen={setOpenAdd2FaCode} />
      <Remove2FaDialog open={openRemove2FaCode} setOpen={setOpenRemove2FaCode} />
    </Card>
  );
}

export default Authentication;
