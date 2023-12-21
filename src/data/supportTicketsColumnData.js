import React from 'react';
import { IconButton, Icon, Tooltip, TextField, Grid } from '@mui/material';
import MDBox from 'components/MDBox';
import { NavLink } from 'react-router-dom';
import MDTypography from 'components/MDTypography';
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, Button, DialogActions } from '@mui/material';
import { Can } from 'context';
import MDButton from 'components/MDButton';
import { closeTicket, retakeTicket, sendReplyToTicket } from 'services/support';
import CloseIcon from '@mui/icons-material/Close';

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
    accessor: 'firstName'
  },
  {
    Header: 'Last Name',
    accessor: 'lastName'
  },
  {
    Header: 'Personal ID',
    accessor: 'personalId'
  },
  {
    Header: 'Phone (optional)',
    accessor: 'phone'
  },
  {
    Header: 'Reason',
    accessor: 'reason'
  },
  {
    Header: 'Taken',
    accessor: 'taken'
  },
  {
    Header: 'Status',
    accessor: 'status'
  },
  {
    Header: '',
    accessor: 'actions',
    sorted: false,
    Cell: ({ row }) => {
      const [showModal, setShowModal] = useState(false);
      const [replyTicketId, setReplyTicketId] = useState('');
      const [reply, setReply] = useState('');
      const [replyError, setReplyError] = useState(false);
      const handleOpenModal = () => setShowModal(true);
      const handleCloseModal = () => {
        setShowModal(false);
        setReply('');
        setReplyTicketId('');
      };

      function formatDateFunc(date) {
        const originalDate = new Date(date);

        const addLeadingZero = (num) => (num < 10 ? `0${num}` : `${num}`);

        const formatDate = `${originalDate.getDate()}.${
          originalDate.getMonth() + 1
        }.${originalDate.getFullYear()} ${originalDate.getHours()}:${addLeadingZero(originalDate.getMinutes())}`;

        return formatDate;
      }

      useEffect(() => {
        if (reply !== '') {
          setReplyError(false);
        }
      }, [reply]);

      return (
        <>
          <MDBox sx={{ display: 'flex', justifyContent: 'center', marginRight: '20px', marginLeft: '-20px' }}>
            <Can I='update' a='casino'>
              <Tooltip title='View & reply'>
                <MDTypography fontSize='0.875rem'>
                  <MDButton
                    size='small'
                    color='info'
                    onClick={() => {
                      handleOpenModal();
                      setReplyTicketId(row.original.id);
                    }}
                  >
                    View & Reply
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
            <DialogTitle id='alert-dialog-title'>
              <MDTypography>{`${row.original.summary}`}</MDTypography>
              <IconButton
                aria-label='close'
                onClick={() => {
                  handleCloseModal();
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
            </DialogTitle>
            <DialogActions>
              <Grid container spacing={3} px={3}>
                <Grid item xs={12}>
                  <MDTypography sx={{ fontSize: '16px' }}>{`${row.original.message}`}</MDTypography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '10px' }}
                >
                  <MDTypography sx={{ fontSize: '14px', fontWeight: 600 }}>Replies:</MDTypography>
                  {row.original.replies.length > 0 ? (
                    row.original.replies.map((reply) => {
                      return (
                        <Grid
                          item
                          xs={12}
                          sx={{
                            borderRadius: '8px',
                            border: '0.5px solid #989898',
                            width: '100%',
                            padding: '5px 10px'
                          }}
                        >
                          <MDTypography
                            sx={{
                              fontSize: '12px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '5px',
                              fontWeight: 500
                            }}
                          >
                            {reply.adminReply
                              ? reply.adminReply.firstName + ' ' + reply.adminReply.lastName
                              : reply.userReply.nickname}
                            <span style={{ fontSize: '10px', opacity: 0.9, fontWeight: 400 }}>
                              {formatDateFunc(reply.createdAt)}
                            </span>
                          </MDTypography>
                          <MDTypography sx={{ fontSize: '14px' }}>{`${reply.message}`}</MDTypography>
                        </Grid>
                      );
                    })
                  ) : (
                    <MDTypography sx={{ fontSize: '14px', fontWeight: '300' }}>No replies</MDTypography>
                  )}
                </Grid>
                {row.original.status != 'Finished' && (
                  <Grid item xs={12}>
                    <TextField
                      sx={
                        replyError
                          ? { width: '100%', border: '1px solid red', borderRadius: '5px' }
                          : { width: '100%', border: 'none' }
                      }
                      multiline
                      rows={5}
                      placeholder='Write a reply...'
                      value={reply}
                      onChange={(e) => setReply(e.target.value)}
                    ></TextField>
                    {row.original.status == 'Initial' && (
                      <MDTypography
                        sx={{
                          fontSize: '12px',
                          fontWeight: '300'
                        }}
                      >
                        Replying to this ticket will automatically asign it to you.
                      </MDTypography>
                    )}
                  </Grid>
                )}
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '15px' }}>
                  {row.original.status != 'Finished' ? (
                    <>
                      <Grid item>
                        <MDButton
                          onClick={async () => {
                            await closeTicket(row.original.id);
                            handleCloseModal();
                          }}
                          color='secondary'
                        >
                          Close ticket
                        </MDButton>
                      </Grid>

                      <Grid item>
                        <MDButton
                          onClick={async () => {
                            {
                              reply === '' ? setReplyError(true) : await sendReplyToTicket(replyTicketId, reply, row.original.status);
                            }
                          }}
                          color='info'
                        >
                          Send reply
                        </MDButton>
                      </Grid>
                    </>
                  ) : (
                    <Grid
                      item
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        gap: '5px'
                      }}
                    >
                      <MDTypography
                        sx={{
                          display: 'flex',
                          justifyContent: 'center',
                          width: '100%',
                          textAlign: 'center',
                          fontSize: '16px',
                          fontWeight: '600',
                          lineHeight: 1
                        }}
                      >
                        Ticket closed!
                      </MDTypography>
                      {/* <MDTypography
                        sx={{
                          fontSize: '14px',
                          fontWeight: 300,
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          lineHeight: 1
                        }}
                        onClick={async () => {
                          await retakeTicket(row.original.id);
                          handleCloseModal();
                        }}
                      >
                        Retake ticket
                      </MDTypography> */}
                    </Grid>
                  )}
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
