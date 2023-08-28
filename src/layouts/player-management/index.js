import DataTablePage from 'components/DataTablePage';
import dataTablePlayersData from 'assets/mockData/dataTablePlayers';
import MDButton from 'components/MDButton';
import { useNavigate, Navigate } from 'react-router-dom';
import { Can } from 'context';
import { getPlayers, getPlayerAggregated } from 'services/players';
import { playerColumnData } from 'data/playerColumnData';
import Filters from './components/Filters';
import { useState } from 'react';
function PlayerManagement() {
  const navigate = useNavigate();
  const onDelete = (id) => {
    console.log(id);
  };
  const [filters, setFilters] = useState({});

  return (
    <>
      <Can I='read' a='user'>
        <DataTablePage
          title='Player Management'
          createButton={
            <Can I='create' a='user'>
              <MDButton variant='contained' color='info' onClick={() => navigate('/player-add')}>
                Add Demo Player
              </MDButton>
            </Can>
          }
          canSearch
          canFilter
          fetchData={getPlayers}
          queryKey='players'
          columnData={playerColumnData}
          object={'player'}
          onDelete={onDelete}
          subrowFetchData={getPlayerAggregated}
          noActions
          filtersComponent={<Filters filters={filters} setFilters={setFilters} />}
        />{' '}
      </Can>
      <Can not I='read' a='user'>
        <Navigate to='/dashboard' />
      </Can>
    </>
  );
}

export default PlayerManagement;
