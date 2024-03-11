import React from 'react';
import { IconButton, Icon, Tooltip } from '@mui/material';
import MDBox from 'components/MDBox';
import { NavLink, useSearchParams } from 'react-router-dom';
import MDTypography from 'components/MDTypography';
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, Button, DialogActions } from '@mui/material';
import { Can } from 'context';
import { deleteRole } from 'services/roles';

const rolesColumnData = [
  {
    Header: 'Id',
    accessor: 'id'
  },
  {
    Header: 'Name',
    accessor: 'name'
  },
  {
    Header: 'Permissions',
    accessor: 'permissions'
  },
  {
    Header: 'Casino',
    accessor: 'casino'
  },
  {
    Header: 'Actions',
    accessor: 'actions',
    sorted: false,
    Cell: ({ row }) => {
      const [showModal, setShowModal] = useState(false);
      const handleOpenModal = () => setShowModal(true);
      const handleCloseModal = () => setShowModal(false);
      const [deleteRoleId, setDeleteRoleId] = useState(row.original.id);
      const [searchParams, setSearchParams] = useSearchParams();

      return (
        <>
          <MDBox sx={{ display: 'flex', justifyContent: 'space-around' }}>
            <Can I='update' a='role'>
              <Tooltip title='Edit'>
                <NavLink to={`/role-management/edit/${row.original.id}`}>
                  <MDTypography fontSize='0.875rem'>
                    <IconButton size='small' color='info'>
                      <Icon fontSize='small'>edit</Icon>
                    </IconButton>
                  </MDTypography>
                </NavLink>
              </Tooltip>
            </Can>
            <Can I='delete' a='role'>
              <Tooltip
                title='Delete'
                onClick={() => {
                  handleOpenModal();
                  setDeleteRoleId(row.original.id);
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
            <DialogTitle id='alert-dialog-title'>{'Are you sure you want to delete this role?'}</DialogTitle>
            <DialogActions>
              <Button
                onClick={async () => {
                  searchParams.set('role-management', deleteRoleId);

                  await deleteRole(deleteRoleId)
                    .then(() => {
                      setSearchParams(searchParams);
                    })
                    .catch((error) => {
                      console.error(error);

                      alert('Something went wrong, please try again!');
                    });

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
export default rolesColumnData;
