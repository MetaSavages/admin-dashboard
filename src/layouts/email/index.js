import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Can } from 'context';
import { getPlayers, getPlayersEmails, getPlayersWithEmails } from 'services/email';
import { useEffect, useState } from 'react';
import emailColumnData from 'data/emailColumnData';
import Filters from './components/Filters';

function EmailSender() {

  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [headerCheck, setHeaderCheck] = useState(false);
  const [arrayOfEmails, setArrayOfEmails] = useState([]);

  useEffect(() => {
    setArrayOfEmails([]);
  }, [filters]);


  return (
    <>  
      <Can I='read' a='email'>
        <DataTablePage
          title='Email Sender'
          createButton={
            <Can I='create' a='email'>
              <MDButton variant='contained' color='info' onClick={() => navigate('/email/email-preview')}>
                Send Email
              </MDButton>
            </Can>
          }
          canSearch
          canFilter
          fetchData={getPlayersWithEmails}
          queryKey='players'
          columnData={emailColumnData}
          object={'email'}
          filters={filters}
          filtersComponent={
            <Filters
              filters={filters}
              setFilters={setFilters}
              arrayOfEmails={arrayOfEmails}
              setArrayOfEmails={setArrayOfEmails}
              setHeaderCheck={setHeaderCheck}
            />
          }
          noActions
          additionalData={{
            arrayOfEmails: arrayOfEmails,
            setArrayOfEmails: (e) => setArrayOfEmails(e),
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
