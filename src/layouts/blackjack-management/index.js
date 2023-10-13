import { Navigate, useNavigate } from 'react-router-dom';
import { Can } from 'context';
import { useState } from 'react';

import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';

import { getAllBlackjackTables } from 'services/blackjack';
import blackjackColumnData from 'data/blackjackColumnData';

function BlackjackManagement() {
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
                onClick={() => navigate('/games/blackjack-management/new-blackjack-table')}
              >
                Add Blackjack table
              </MDButton>
            </Can>
          }
          canSearch
          canFilter
          fetchData={getAllBlackjackTables}
          queryKey='casinos'
          columnData={blackjackColumnData}
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

export default BlackjackManagement;
