import MDButton from 'components/MDButton';

const { DialogContent, DialogActions } = require('@mui/material');
const { default: MDBox } = require('components/MDBox');
const { default: MDTypography } = require('components/MDTypography');

function Success2Fa({ setSteps, setOpen }) {
  return (
    <>
      <DialogContent>
        <MDBox p={3} width='100%' display='flex' flexDirection='column' justifyContent='center'>
          <MDTypography paddingLeft='30px' gutterBottom color='white' sx={{ fontWeight: '600' }}>
            2FA is successfully disabled for your account.
          </MDTypography>
        </MDBox>
      </DialogContent>
      <DialogActions>
        <MDButton
          autoFocus
          onClick={() => {
            setSteps(1);
            setOpen(false);
          }}
        >
          Close
        </MDButton>
      </DialogActions>
    </>
  );
}

export default Success2Fa;
