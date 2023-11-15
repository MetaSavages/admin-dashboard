import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { Can } from 'context';
// import codesColumnData from 'data/codesColumnData copy';
import { createCodes, getCodes } from 'services/codes';
import { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import { Button } from '@mui/base';
import codesColumnData from 'data/codesColumnData';
import Filters from './components/Filters';

function CodeManagement() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [headerCheck, setHeaderCheck] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const location = useLocation();
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [arrayFromCodes, setArrayFromCodes] = useState([]);

  useEffect(() => {
    if (searchParams.get('code')) {
      setFilters(filters.length ? '' : 'd');
      searchParams.delete('code');
    }
    setSearchParams(searchParams);
  }, [location.search]);

  useEffect(() => {
    setArrayFromCodes([]);
  }, [filters]);

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

  const createPromoCode = async () => {
    const response = await createCodes(1);
    if (response.status === 201) {
      alert('Codes created successfully');
      setFilters(filters.length ? '' : 'd');
    } else {
      alert('Codes creation failed');
    }
  };

  return (
    <>
      <Can I='read' a='code'>
        <DataTablePage
          title='Cade Management'
          createButton={
            <Can I='create' a='code'>
              {/* This is to show a window where user can write how much promo codes want to be  generated  */}
              {/* <MDButton variant='contained' color='info' onClick={() => navigate('/promo-codes/new-codes')}>
                Add Codes
              </MDButton> */}
              <MDButton variant='contained' color='info' onClick={() => createPromoCode()}>
                Add Codes
              </MDButton>
            </Can>
          }
          canSearch
          canFilter
          // fetchData={fetchData}
          fetchData={getCodes}
          queryKey='codes'
          columnData={codesColumnData}
          object={'code'}
          onDelete={(id) => {
            handleOpenModal();
          }}
          filters={filters}
          filtersComponent={
            <Filters
              filters={filters}
              setFilters={setFilters}
              arrayFromCodes={arrayFromCodes}
              setArrayFromCodes={setArrayFromCodes}
              setHeaderCheck={setHeaderCheck}
            />
          }
          noActions
          additionalData={{
            arrayFromCodes: arrayFromCodes,
            setArrayFromCodes: (e) => setArrayFromCodes(e),
            headerCheck: headerCheck,
            setHeaderCheck: setHeaderCheck
          }}
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
