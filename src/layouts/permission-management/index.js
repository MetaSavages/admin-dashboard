import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { useNavigate } from 'react-router-dom';
import { getPermissions, deletePermission } from 'services/permissions';
import permissionsColumnData from 'data/permissionsColumnData';
import { useEffect, useState } from 'react';
import { IconButton, Icon, Tooltip, Dialog, DialogTitle, DialogContent, DialogContentText, Button, DialogActions, TextField } from '@mui/material';
function PermissionManagement() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [deletePermissionId, setDeletePermissionId] = useState('');
  
  return (
    <>
      <DataTablePage
        title='Permission Management'
        createButton={
          <MDButton variant='contained' color='info' onClick={() => navigate('/permission-management/new-permission')}>
            Add Permission
          </MDButton>
        }
        canSearch
        canFilter
        fetchData={getPermissions}
        queryKey='permissions'
        columnData={permissionsColumnData}
        onDelete={
          (id) => {
            setDeletePermissionId(id); 
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
              {'Are you sure you want to delete this permission?'}
          </DialogTitle>
          <DialogActions>
              <Button onClick={
                async () => {
                  await deletePermission(deletePermissionId); 
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

export default PermissionManagement;
