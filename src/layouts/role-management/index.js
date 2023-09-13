import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { useNavigate } from 'react-router-dom';
import { getRoles, deleteRole } from 'services/roles';
import rolesColumnData from 'data/rolesColumnData';
import { useState } from 'react';
import { IconButton, Icon, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions, TextField } from '@mui/material';
function RoleManagement() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [deleteRoleId, setDeleteRoleId] = useState('');
  
  return (
    <>
      <DataTablePage
        title='Role Management'
        createButton={
          <MDButton variant='contained' color='info' onClick={() => navigate('/role-management/new-role')}>
            Add Role
          </MDButton>
        }
        canSearch
        canFilter
        fetchData={getRoles}
        queryKey='roles'
        columnData={rolesColumnData}
        onDelete={
          (id) => {
            setDeleteRoleId(id); 
            handleOpenModal();
          }
        }
      />
      <Dialog
          open={showModal}
          onClose={handleCloseModal}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
      >
          <DialogTitle id='alert-dialog-title'>
              {'Are you sure you want to delete this role?'}
          </DialogTitle>
          <DialogActions>
              <Button onClick={
                async () => {
                  await deleteRole(deleteRoleId);
                  handleCloseModal(); 
                  window.location.reload();
                }
              }>Yes</Button>
              <Button onClick={handleCloseModal}>No</Button>
          </DialogActions>
      </Dialog>
    </>
  );
}

export default RoleManagement;
