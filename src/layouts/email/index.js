import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { Can } from 'context';
import { getPlayers , getPlayerAggregated } from 'services/email';
import { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import { Button } from '@mui/base';
import emailColumnData from 'data/emailColumnData';
import Filters from './components/Filters';

function EmailSender() {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [headerCheck, setHeaderCheck] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const location = useLocation();
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const [arrayOfPlayers, setArrayOfPlayers] = useState([]);


  useEffect(() => {
    setArrayOfPlayers([]);
  }, [filters]);


  const createEmail = async () => {
    alert('Sending email');
  };

  return (
    <>
      <Can I='read' a='email'>
        <DataTablePage
          title='Email Sender'
          createButton={
            <Can I='create' a='email'>
              <MDButton variant='contained' color='info' onClick={() => createEmail()}>
                Send Email
              </MDButton>
            </Can>
          }
          canSearch
          canFilter
          // fetchData={fetchData}
          fetchData={getPlayers}
          queryKey='players'
          columnData={emailColumnData}
          object={'email'}
          // subrowFetchData={getPlayerAggregated}
          filters={filters}
          filtersComponent={
            <Filters
              filters={filters}
              setFilters={setFilters}
              arrayOfPlayers={arrayOfPlayers}
              setArrayOfPlayers={setArrayOfPlayers}
              setHeaderCheck={setHeaderCheck}
            />
          }
          noActions
          additionalData={{
            arrayOfPlayers: arrayOfPlayers,
            setArrayOfPlayers: (e) => setArrayOfPlayers(e),
            headerCheck: headerCheck,
            setHeaderCheck: setHeaderCheck
          }}
        />
      </Can>
      <Can not I='read' a='email'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default EmailSender;
