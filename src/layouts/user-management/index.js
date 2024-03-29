import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { Navigate, useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from 'services/users';
import userColumnData from 'data/usersColumnData';
import { Dialog, DialogTitle, DialogActions } from '@mui/material';
import { Can } from 'context';
import { useState } from 'react';

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
          onDelete={(id) => {
            setDeleteUserId(id);
            handleOpenModal();
          }}
          filters={filters}
        />
        <Dialog
          open={showModal}
          onClose={handleCloseModal}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{'Are you sure you want to delete this user?'}</DialogTitle>
          <DialogActions>
            <MDButton
              onClick={async () => {
                try {
                  await deleteUser(deleteUserId);
                  setFilters({
                    ...filters,
                    refresh: filters?.refresh ? !filters.refresh : true
                  });
                } catch (error) {
                  console.error(error.message);
                  alert('Something went wrong, please try again!');
                }
                handleCloseModal();
              }}
            >
              Yes
            </MDButton>
            <MDButton onClick={handleCloseModal}>No</MDButton>
          </DialogActions>
        </Dialog>
      </Can>
      <Can not I='read' a='user'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default UserManagement;
