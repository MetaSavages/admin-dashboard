import React from 'react';
import { IconButton, Icon, Tooltip, TextField, Grid } from '@mui/material';
import MDBox from 'components/MDBox';
import { NavLink } from 'react-router-dom';
import MDTypography from 'components/MDTypography';
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, Button, DialogActions } from '@mui/material';
import { Can } from 'context';
import MDButton from 'components/MDButton';
import { sendReplyToTicket } from 'services/support';

const supportTicketsColumnData = [
  {
    Header: 'ID',
    accessor: 'id'
  },
  {
    Header: 'Email',
    accessor: 'email'
  },
  {
    Header: 'Nickname',
    accessor: 'nickname'
  },
  {
    Header: 'First Name',
    accessor: 'first_name'
  },
  {
    Header: 'Last Name',
    accessor: 'last_name'
  },
  {
    Header: 'Phone (optional)',
    accessor: 'phone'
  },
  {
    Header: 'Reviewed',
    accessor: 'reviewed'
  },
  {
    Header: '',
    accessor: 'message',
    sorted: false,
    Cell: ({ row }) => {
      const [showMessageModal, setShowMessageModal] = useState(false);
      const handleOpenMessageModal = () => setShowMessageModal(true);
      const handleCloseMessageModal = () => {
        setShowMessageModal(false);
      };

      return (
        <>
          <MDBox sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <MDTypography fontSize='0.875rem'>
              <MDButton
                size='small'
                variant='text'
                onClick={() => {
                  handleOpenMessageModal();
                }}
              >
                View Ticket
              </MDButton>
            </MDTypography>
          </MDBox>
          <Dialog
            open={showMessageModal}
            onClose={handleCloseMessageModal}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>{`Ticket №${row.original.id}`}</DialogTitle>
            <DialogActions>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MDTypography sx={{ fontSize: '16px' }} px={3}>{`${row.original.message}`}</MDTypography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button onClick={handleCloseMessageModal}>Close</Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Dialog>
        </>
      );
    }
  },
  {
    Header: '',
    accessor: 'actions',
    sorted: false,
    Cell: ({ row }) => {
      const [showModal, setShowModal] = useState(false);
      const [replyTicketId, setReplyTicketId] = useState('');
      const [reply, setReply] = useState('');
      const handleOpenModal = () => setShowModal(true);
      const handleCloseModal = () => {
        setShowModal(false);
        setReply('');
        setReplyTicketId('');
      };

      return (
        <>
          <MDBox sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Can I='update' a='casino'>
              <Tooltip title='Reply'>
                <MDTypography fontSize='0.875rem'>
                  <MDButton
                    size='small'
                    color='info'
                    onClick={() => {
                      handleOpenModal();
                      setReplyTicketId(row.original.id);
                    }}
                  >
                    Reply
                  </MDButton>
                </MDTypography>
              </Tooltip>
            </Can>
          </MDBox>
          <Dialog
            open={showModal}
            onClose={handleCloseModal}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>{`Reply to Ticket №${row.original.id}`}</DialogTitle>
            <DialogActions>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <MDTypography
                    sx={{ fontSize: '16px', fontStyle: 'italic' }}
                    px={3}
                  >{`"${row.original.message}"`}</MDTypography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ width: '100%' }}
                    multiline
                    rows={5}
                    placeholder='Your reply...'
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  ></TextField>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    onClick={async () => {
                      await sendReplyToTicket(replyTicketId, reply);
                      handleCloseModal();
                    }}
                  >
                    Send
                  </Button>
                  <Button onClick={handleCloseModal}>Close</Button>
                </Grid>
              </Grid>
            </DialogActions>
          </Dialog>
        </>
      );
    }
  }
];
export default supportTicketsColumnData;
