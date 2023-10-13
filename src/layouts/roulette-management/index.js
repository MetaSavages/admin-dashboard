import { Navigate, useNavigate } from 'react-router-dom';
import { Can } from 'context';
import { useState } from 'react';

import DataTablePage from 'components/DataTablePage';
import MDButton from 'components/MDButton';

import { getAllRouletteTables } from 'services/roulette';
import rouletteColumnData from 'data/rouletteColumnData';

function RouletteManagement() {
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
                onClick={() => navigate('/games/roulette-management/new-roulette-table')}
              >
                Add Roulette table
              </MDButton>
            </Can>
          }
          canSearch
          canFilter
          fetchData={getAllRouletteTables}
          queryKey='casinos'
          columnData={rouletteColumnData}
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

export default RouletteManagement;
