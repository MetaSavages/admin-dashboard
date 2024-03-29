import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { getPermissions, deletePermission } from 'services/permissions';
import permissionsColumnData from 'data/permissionsColumnData';
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, Button, DialogActions } from '@mui/material';
import { Can } from 'context';

function PermissionManagement() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [deletePermissionId, setDeletePermissionId] = useState('');
  const [filters, setFilters] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('permission-management')) {
      setFilters({
        ...filters,
        refresh: filters?.refresh ? !filters.refresh : true
      });
      searchParams.delete('permission-management');
    }
    setSearchParams(searchParams);
  }, [location.search]);

  return (
    <>
      <Can I='read' a='permission'>
        <DataTablePage
          title='Permission Management'
          createButton={
            <MDButton
              variant='contained'
              color='info'
              onClick={() => navigate('/permission-management/new-permission')}
            >
              Add Permission
            </MDButton>
          }
          canSearch
          canFilter
          fetchData={getPermissions}
          queryKey='permissions'
          columnData={permissionsColumnData}
          onDelete={(id) => {
            setDeletePermissionId(id);
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
          <DialogTitle id='alert-dialog-title'>{'Are you sure you want to delete this permission?'}</DialogTitle>
          <DialogActions>
            <Button
              onClick={async () => {
                await deletePermission(deletePermissionId);
                handleCloseModal();
                setFilters({
                  ...filters,
                  refresh: filters?.refresh ? !filters.refresh : true
                });
              }}
            >
              Yes
            </Button>
            <Button onClick={handleCloseModal}>No</Button>
          </DialogActions>
        </Dialog>
      </Can>
      <Can not I='read' a='permission'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default PermissionManagement;
