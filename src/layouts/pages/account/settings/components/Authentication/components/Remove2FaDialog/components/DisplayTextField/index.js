import { useState } from 'react';
import { DialogActions, DialogContent } from '@mui/material';

import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';

import { remove2Fa, turnOn2Fa } from 'services/2fa';

import { getCurrentUser } from 'services/auth';
import { setTwoFactor, useMaterialUIController } from 'context';

import './index.css';

function DisplayTextField({ setSteps }) {
  const [controller, dispatch] = useMaterialUIController();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  function handleChange(e) {
    const currentCode = e.target.value;

    if (currentCode.length <= 6) {
      setCode(currentCode);

      if (error) {
        setError('');
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (code?.length < 6) {
      return;
    }
    try {
      const result = await remove2Fa(code);
      if (result.status == 200) {
        setSteps((prev) => prev + 1);

        getCurrentUser()
          .then((user) => {
            setTwoFactor(dispatch, user.isTwoFactorAuthenticationEnabled);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <DialogContent>
        <MDTypography px={2} sx={{ textAlign: 'center', fontSize: '16px' }}>
          Enter the code from your auth app below to disable 2FA
        </MDTypography>
        <MDBox className='remove-arrows-from-input' mt={1.5} mb={1.5} px={2}>
          <MDInput
            type='number'
            label='Code'
            fullWidth
            value={code}
            onChange={handleChange}
            error={error ? true : false}
          />
          <MDBox mt={0.75}>
            <MDTypography component='div' variant='caption' color='error' fontWeight='regular'>
              {error}
            </MDTypography>
          </MDBox>
        </MDBox>
      </DialogContent>
      <DialogActions>
        <MDButton autoFocus onClick={handleSubmit} disabled={code?.length >= 6 ? false : true}>
          Next
        </MDButton>
      </DialogActions>
    </>
  );
}

export default DisplayTextField;
