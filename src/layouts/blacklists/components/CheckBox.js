import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Fade, Grow, Zoom } from '@mui/material';

function CheckBox(row) {
  const [checkedValue, setChecked] = useState(row.row.original.blacklisted);
  const [modalView, setModalView] = useState(false);
  const handleChange = () => {
    setModalView(false);
    setChecked(!checkedValue);
  };
  const handleClose = () => {
    setModalView(false);
  };

  return (
    <div>
      <Checkbox onChange={() => setModalView(true)} checked={checkedValue} />
      <div>
        <Dialog
          fullWidth
          maxWidth='xs'
          open={modalView}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <Fade in={modalView} timeout={1000}>
            <div>
              <DialogTitle id='alert-dialog-title' textAlign={'center'}>
                Warning!
              </DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-description' textAlign={'center'}>
                  Are you sure you want to {!checkedValue ? 'enable' : 'disable'} connections from{' '}
                  {row.row.original.country}?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleChange}
                  sx={{
                    textAlign: 'center',
                    color: '#f44336',
                    '&:hover': { backgroundColor: '#f44336', color: '#fff' }
                  }}
                >
                  Yes
                </Button>
                <Button onClick={handleClose} sx={{ alignSelf: 'center' }}>
                  No
                </Button>
              </DialogActions>
            </div>
          </Fade>
        </Dialog>
      </div>
    </div>
  );
}

export default CheckBox;
