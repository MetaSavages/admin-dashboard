import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { Navigate, useNavigate } from 'react-router-dom';
import rolesColumnData from 'data/rolesColumnData';
import { useState } from 'react';
import { Dialog, DialogTitle, Button, DialogActions } from '@mui/material';
import { Can } from 'context';

function EmailSender() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [deleteRoleId, setDeleteRoleId] = useState('');
  const [filters, setFilters] = useState('');
  return (
    <>
      <Can I='read' a='email'>
        <DataTablePage
          title='Email Sender'
          createButton={
            <MDButton variant='contained' color='info' onClick={() => navigate('/role-management/new-role')}>
              Add Email
            </MDButton>
          }
          canSearch
          canFilter
          // fetchData={}
          queryKey='email'
          columnData={rolesColumnData}
          onDelete={(id) => {
            setDeleteRoleId(id);
            handleOpenModal();
          }}
          filters={filters}
          noActions
        />
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
                await deleteRole(deleteRoleId);
                handleCloseModal();
                setFilters(filters.length ? '' : 'd');
              }}
            >
              Yes
            </Button>
            <Button onClick={handleCloseModal}>No</Button>
          </DialogActions>
        </Dialog>
      </Can>
      <Can not I='read' a='email'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default EmailSender;
