import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { getCasinos } from 'services/casinos';
import { casinosColumnData } from 'data/casinosColumnData';
import { Can } from 'context';
// import codesColumnData from 'data/codesColumnData copy';
import { getCodes } from 'services/codes';
import { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import { Button } from '@mui/base';
import codesColumnData from 'data/codesColumnData';

function CodeManagement() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [deleteCodeId, setDeleteCodeId] = useState('');
  const location = useLocation();
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('code')) {
      setFilters(filters.length ? '' : 'd');

      searchParams.delete('code');
      setSearchParams(searchParams);
    }
  }, [location.search]);

  const onDelete = (id) => {
    console.log(id);
  };
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: [],
          meta: {
            totalItems: 20
          }
        });
      }, 100);
    });
  };

  return (
    <>
      <Can I='read' a='code'>
        <DataTablePage
          title='Cade Management'
          createButton={
            <Can I='create' a='code'>
              <MDButton variant='contained' color='info' onClick={() => navigate('/promo-codes/new-codes')}>
                Add Codes
              </MDButton>
            </Can>
          }
          canSearch
          canFilter
          fetchData={getCodes}
          queryKey='codes'
          columnData={codesColumnData}
          object={'code'}
          onDelete={(id) => {
            setDeleteCodeId(id);
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
          <DialogTitle id='alert-dialog-title'>{'Are you sure you want to delete this code?'}</DialogTitle>
          <DialogActions>
            <Button
              onClick={async () => {
                await deleteCode(deleteRoleId);
                handleCloseModal();
                // setFilters(filters.length ? '' : 'd');
              }}
            >
              Yes
            </Button>
            <Button onClick={handleCloseModal}>No</Button>
          </DialogActions>
        </Dialog>
      </Can>
      <Can not I='read' a='code'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default CodeManagement;
