import { useEffect, useState } from 'react';
import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { getRoles, deleteRole } from 'services/roles';
import rolesColumnData from 'data/rolesColumnData';
import { Dialog, DialogTitle, Button, DialogActions } from '@mui/material';
import { Can } from 'context';

function RoleManagement() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [deleteRoleId, setDeleteRoleId] = useState('');
  const [filters, setFilters] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('role-management')) {
      setFilters({
        ...filters,
        refresh: filters?.refresh ? !filters.refresh : true
      });
      searchParams.delete('role-management');
    }
    setSearchParams(searchParams);
  }, [location.search]);

  return (
    <>
      <Can I='read' a='role'>
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
                await deleteRole(deleteRoleId).catch((error) => {
                  console.error(error);
                });

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
      <Can not I='read' a='role'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default RoleManagement;
