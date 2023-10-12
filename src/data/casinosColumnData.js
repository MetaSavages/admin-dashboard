import React from 'react';
import { IconButton, Icon, Tooltip } from '@mui/material';
import MDBox from 'components/MDBox';
import { NavLink } from 'react-router-dom';
import MDTypography from 'components/MDTypography';
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, Button, DialogActions } from '@mui/material';
import { deleteCasino } from 'services/casinos';
import { Can } from 'context';

export const casinosColumnData = [
  {
    Header: 'Casino Id',
    accessor: 'casino_id'
  },
  {
    Header: 'Casino name',
    accessor: 'casino_name'
  },
  {
    Header: 'Provider',
    accessor: 'provider'
  },
  {
    Header: 'Active players',
    accessor: 'active_players'
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    sorted: false,
    Cell: ({ row }) => {
      const [showModal, setShowModal] = useState(false);
      const handleOpenModal = () => setShowModal(true);
      const handleCloseModal = () => setShowModal(false);
      const [deleteCasinoId, setDeleteCasinoId] = useState('');

      return (
        <>
          <MDBox sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Can I='update' a='casino'>
              <Tooltip title='Edit'>
                <NavLink to={`/casinos/edit/${row.original.casino_id}`}>
                  <MDTypography fontSize='0.875rem'>
                    <IconButton size='small' color='info'>
                      <Icon fontSize='small'>edit</Icon>
                    </IconButton>
                  </MDTypography>
                </NavLink>
              </Tooltip>
            </Can>
            <Can I='delete' a='casino'>
              <Tooltip
                title='Delete'
                onClick={() => {
                  handleOpenModal();
                  setDeleteCasinoId(row.original.casino_id);
                }}
              >
                <IconButton size='small' color='error'>
                  <Icon fontSize='small'>delete</Icon>
                </IconButton>
              </Tooltip>
            </Can>
          </MDBox>

          <Dialog
            open={showModal}
            onClose={handleCloseModal}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>{'Are you sure you want to delete this casino?'}</DialogTitle>
            <DialogActions>
              <Button
                onClick={async () => {
                  await deleteCasino(deleteCasinoId);
                  handleCloseModal();
                }}
              >
                Yes
              </Button>
              <Button onClick={handleCloseModal}>No</Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }
  }
];
