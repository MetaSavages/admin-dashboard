import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { Can } from 'context';
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
  const [queryPageIndex, setQueryPageIndex] = useState(0);
  const [queryPageSize, setQueryPageSize] = useState(0);
  const [codesPerPage, setCodesPerPage] = useState(null);

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

  useEffect(() => {
    handleGetCodes();
  }, [queryPageIndex, queryPageSize, filters]);

  useEffect(() => {
    checkHeaderCheckToRowChecks();
  }, [codesPerPage, arrayFromCodes]);

  function checkHeaderCheckToRowChecks() {
    let isAllCodesIncluded = false;
    if (codesPerPage?.length > 0) {
      isAllCodesIncluded = codesPerPage.every((obj) => arrayFromCodes.includes(obj.code));
    }
    setHeaderCheck(isAllCodesIncluded);
  }

  const createPromoCode = async () => {
    const response = await createCodes(1);
    if (response.status === 201) {
      alert('Codes created successfully');
      setFilters(filters.length ? '' : 'd');
    } else {
      alert('Codes creation failed');
    }
  };

  function handleGetCodes() {
    const nextPage = queryPageIndex + 1;
    getCodes(queryPageSize, nextPage, filters)
      .then((result) => {
        if (result?.data?.length > 0) {
          setCodesPerPage(result.data);
        }
      })
      .catch(() => {});
  }
  return (
    <>
      <Can I='read' a='promocode'>
        <DataTablePage
          title='Code Management'
          createButton={
            <Can I='create' a='promocode'>
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
          fetchData={getCodes}
          queryKey='codes'
          columnData={codesColumnData}
          object={'promocode'}
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
            setHeaderCheck,
            setQueryPageIndex,
            setQueryPageSize
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
      <Can not I='read' a='promocode'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default CodeManagement;
