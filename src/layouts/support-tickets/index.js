import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { Navigate, useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogActions, Card } from '@mui/material';
import { Can } from 'context';
import { useState, useEffect } from 'react';

import { getUsers, deleteUser } from 'services/users';
import userColumnData from 'data/usersColumnData';

function SupportTickets() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [deleteUserId, setDeleteUserId] = useState('');
  const [filters, setFilters] = useState('');

  return (
    <>
      <Can I='read' a='support'>
      <DataTablePage
          title='Support Tickets Management'
          createButton={
            <Can I='create' a='support'>
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
          object={'support'}
          onDelete={(id) => {
            setDeleteUserId(id);
            handleOpenModal();
          }}
          filters={filters}
        />
      </Can>
      <Can not I='read' a='support'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default SupportTickets;
