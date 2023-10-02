import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from 'services/users';
import userColumnData from 'data/usersColumnData';
import { Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { Skeleton } from '@mui/material';
import { Can } from 'context';


function UserManagement() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [deleteUserId, setDeleteUserId] = useState('');
  const [filters, setFilters] = useState('');

  return (
    <>
      <Can I='read' a='user'>
        <DataTablePage
          title='User Management'
          createButton={
            <Can I='create' a='user'>
              <MDButton variant='contained' color='info' onClick={() => navigate('/user-management/new-user')}>
                Add User
              </MDButton>
            </Can>
          }
          canSearch
          canFilter
          fetchData={getUsers}
          queryKey='users'
          columnData={userColumnData}
          object={'user'}
          onDelete={
            (id) => {
              setDeleteUserId(id); 
              handleOpenModal();
            }
          }
          filters={filters}
        />
      </Can>
      <Can not I='read' a='user'>
        <Navigate to='/dashboard' />
      </Can>
      <Dialog
          open={showModal}
          onClose={handleCloseModal}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
      >
          <DialogTitle id='alert-dialog-title'>
              {'Are you sure you want to delete this user?'}
          </DialogTitle>
          <DialogActions>
              <Button onClick={
                async () => {
                  await deleteUser(deleteUserId); 
                  handleCloseModal(); 
                  setFilters(filters.length ? "" : "d");
                }
              }>Yes</Button>
              <Button onClick={handleCloseModal}>No</Button>
          </DialogActions>
      </Dialog>
    </>
  );
}

export default UserManagement;
