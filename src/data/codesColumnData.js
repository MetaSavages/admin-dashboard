import React, { useState } from 'react';
import { IconButton, Icon, Tooltip } from '@mui/material';
import { Dialog, DialogTitle, Button, DialogActions } from '@mui/material';

import MDBox from 'components/MDBox';

import { Can } from 'context';

import { deleteCode } from 'services/codes';
import { useSearchParams } from 'react-router-dom';

const codesColumnData = [
  {
    Header: 'Code Id',
    accessor: 'code_id'
  },
  {
    Header: 'code',
    accessor: 'code'
  },
  {
    Header: 'Claimed User',
    accessor: 'claimed_user'
  },
  {
    Header: 'Date Create',
    accessor: 'date_create'
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    sorted: false,
    Cell: ({ row }) => {
      const [showModal, setShowModal] = useState(false);
      const handleOpenModal = () => setShowModal(true);
      const handleCloseModal = () => setShowModal(false);
      const [deletePromoCode, setDeletePromoCode] = useState('');
      const [searchParams, setSearchParams] = useSearchParams();

      return (
        <>
          <MDBox sx={{ display: 'flex', justifyContent: 'space-around' }}>
            {/* <Can I='update' a='casino'>
              <Tooltip title='Edit'>
                <NavLink to={`/casinos/edit/${row.original.casino_id}`}>
                  <MDTypography fontSize='0.875rem'>
                    <IconButton size='small' color='info'>
                      <Icon fontSize='small'>edit</Icon>
                    </IconButton>
                  </MDTypography>
                </NavLink>
              </Tooltip>
            </Can> */}
            <Can I='delete' a='casino'>
              <Tooltip
                title='Delete'
                onClick={() => {
                  handleOpenModal();
                  setDeletePromoCode(row.original.code);
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
                  searchParams.set('code', deletePromoCode);

                  // Update the URL in the address bar to reflect the changes
                  setSearchParams(searchParams);
                  await deleteCode(deletePromoCode);
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

export default codesColumnData;
