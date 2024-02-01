import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Can } from 'context';
import { getPlayersEmails, getPlayersWithEmails } from 'services/email';
import { useEffect, useState } from 'react';
import emailColumnData from 'data/emailColumnData';
import Filters from './components/Filters';
import { useEmails } from 'context/emailContext';

function EmailSender() {

  const navigate = useNavigate();
  const [filters, setFilters] = useState({});
  const [headerCheck, setHeaderCheck] = useState(false);
  const [arrayOfEmails, setArrayOfEmails] = useState([]);
  const { setSelectedEmails } = useEmails();

  useEffect(() => {
    setArrayOfEmails([]);
  }, [filters]);

  const saveAllEmails = async () => {
    try {
      const emails = await getPlayersEmails(filters);
      setSelectedEmails(emails.data.data);
      alert('Emails saved successfully');
    } catch (error) {
      alert(error.message);
    }
  }


  return (
    <>  
      <Can I='read' a='email'>
        <DataTablePage
          title='Email Sender'
          createButton={
            <Can I='create' a='email'>
              <MDButton variant='contained' color='success' onClick={() => saveAllEmails()}>
                Save All Emails For Current Filters
              </MDButton>
              <MDButton variant='contained' color='primary' onClick={() => navigate('/email/email-preview')}>
                Go to templates
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
