import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MDBox from 'components/MDBox';
import { useState } from 'react';
import DisplayTextField from './components/DisplayTextField';
import Success2Fa from './components/Success2Fa/Success2Fa';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

function Remove2FaDialog({ open, setOpen }) {
  const [steps, setSteps] = useState(1);

  function handleClose(e) {
    e.preventDefault();
    setOpen(false);
    setSteps(1);
  }

  function showContent() {
    switch (steps) {
      case 1:
        return <DisplayTextField setSteps={setSteps} />;
      case 2:
        return <Success2Fa setSteps={setSteps} setOpen={setOpen} />;
      default:
        break;
    }
  }

  return (
    <BootstrapDialog onClose={handleClose} aria-labelledby='customized-dialog-title' open={open}>
      <MDBox>
        <DialogTitle sx={{ m: 0, p: 2, minWidth: '500px' }} id='customized-dialog-title'>
          Two-factor authentication
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={() => {
            setSteps(1);
            setOpen(false);
          }}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <CloseIcon />
        </IconButton>
        {showContent()}
      </MDBox>
    </BootstrapDialog>
  );
}

export default Remove2FaDialog;
