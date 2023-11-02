import React from 'react';
import { IconButton, Icon, Tooltip } from '@mui/material';
import MDBox from 'components/MDBox';
import { NavLink } from 'react-router-dom';
import MDTypography from 'components/MDTypography';
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, Button, DialogActions } from '@mui/material';
import { Can } from 'context';
import { deletePermission } from 'services/permissions';

const permissionsColumnData = [
  {
    Header: 'Id',
    accessor: 'id'
  },
  {
    Header: 'Action',
    accessor: 'action'
  },
  {
    Header: 'Object',
    accessor: 'object'
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    sorted: false,
    Cell: ({ row }) => {
      const [showModal, setShowModal] = useState(false);
      const handleOpenModal = () => setShowModal(true);
      const handleCloseModal = () => setShowModal(false);
      const [deletePermissionId, setDeletePermissionId] = useState(row.original.id);

      return (
        <>
          <MDBox sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Can I='update' a='permission'>
              <Tooltip title='Edit'>
                <NavLink to={`/permission-management/edit/${row.original.id}`}>
                  <MDTypography fontSize='0.875rem'>
                    <IconButton size='small' color='info'>
                      <Icon fontSize='small'>edit</Icon>
                    </IconButton>
                  </MDTypography>
                </NavLink>
              </Tooltip>
            </Can>
            <Can I='delete' a='permission'>
              <Tooltip
                title='Delete'
                onClick={() => {
                  handleOpenModal();
                  setDeletePermissionId(row.original.id);
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
            <DialogTitle id='alert-dialog-title'>{'Are you sure you want to delete this permission?'}</DialogTitle>
            <DialogActions>
              <Button
                onClick={async () => {
                  await deletePermission(deletePermissionId);
                  handleCloseModal();
                  window.location.reload();
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
export default permissionsColumnData;
