import MDButton from 'components/MDButton';
import { useEffect, useState } from 'react';
import { generateQrCode } from 'services/2fa';

const { DialogContent, DialogActions } = require('@mui/material');
const { default: MDBox } = require('components/MDBox');
const { default: MDTypography } = require('components/MDTypography');

function DisplayQrCode({
  // base64Image,
  setSteps
}) {
  const [base64Image, setBase64Image] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    generateQrCode()
      .then((result) => {
        if (result) {
          setBase64Image(result.data);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <>
      <DialogContent>
        <MDBox p={3} width='100%' display='flex' flexDirection='column' justifyContent='center'>
          <MDBox width='100%' display='flex' justifyContent='center'>
            <MDTypography gutterBottom sx={{fontSize: '16px'}} mb={2}>
              Please scan the QR code with your 2FA app
            </MDTypography>
          </MDBox>
          <MDBox width='100%' display='flex' justifyContent='center'>
            {base64Image && <img src={base64Image} alt='Base64 Image' width={'250px'} />}
          </MDBox>
        </MDBox>
      </DialogContent>
      <DialogActions>
        <MDButton autoFocus onClick={() => setSteps((prev) => prev + 1)}>
          Next
        </MDButton>
      </DialogActions>
    </>
  );
}

export default DisplayQrCode;
