import MDButton from 'components/MDButton';

const { DialogContent, DialogActions } = require('@mui/material');
const { default: MDBox } = require('components/MDBox');
const { default: MDTypography } = require('components/MDTypography');

function Success2Fa({ setSteps, setOpen }) {
  return (
    <>
      <DialogContent dividers>
        <MDBox p={3} width='100%' display='flex' flexDirection='column' justifyContent='center'>
          <MDTypography paddingLeft='30px' gutterBottom color='success'>
            You successfully remove two-factor authentication
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
