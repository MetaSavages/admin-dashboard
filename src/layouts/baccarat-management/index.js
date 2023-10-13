import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';
import { Navigate, useNavigate } from 'react-router-dom';

import baccaratColumnData from 'data/baccaratColumnData';
import { Can } from 'context';
import { useState } from 'react';
import { getAllBaccaratTables } from 'services/baccarat';

function BaccaratManagement() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState('');

  return (
    <>
      <Can I='read' a='user'>
        <DataTablePage
          title='User Management'
          createButton={
            <Can I='create' a='user'>
              <MDButton
                variant='contained'
                color='info'
                onClick={() => navigate('/games/baccarat-management/new-baccarat-table')}
              >
                Add Baccarat table
              </MDButton>
            </Can>
          }
          canSearch
          canFilter
          fetchData={getAllBaccaratTables}
          queryKey='casinos'
          columnData={baccaratColumnData}
          object={'casino'}
          onDelete={(id) => {}}
          filters={filters}
        />
      </Can>
      <Can not I='read' a='user'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default BaccaratManagement;
