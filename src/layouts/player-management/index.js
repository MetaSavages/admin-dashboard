import DataTablePage from 'components/DataTablePage';
import dataTablePlayersData from 'assets/mockData/dataTablePlayers';
import MDButton from 'components/MDButton';
import { useNavigate, Navigate } from 'react-router-dom';
import { getPlayers, getPlayerAggregated } from 'services/players';
import { playerColumnData } from 'data/playerColumnData';
import Filters from './components/Filters';
import { useEffect, useState } from 'react';
import { deletePlayer } from 'services/players';
import { Can } from 'context';

function PlayerManagement() {
  const navigate = useNavigate();
  const onDelete = (id) => {
    deletePlayer(id).then((res) => {
      console.log(res);
      window.location.reload();
    });
  };

  const [filters, setFilters] = useState({});
  const [cols, setCols] = useState(null);

  useEffect(() => {
      playerColumnData().then((res) => {
        setCols(res);
      });
  }, [filters]);

  if (!cols) return <></>;
  return (
    <>
      <Can I='read' a='user'>
        <DataTablePage
          title='Player Management'
          createButton={
            <Can I='create' a='user'>
              <MDButton variant='contained' color='info' onClick={() => navigate('/player-management/new-player/')}>
                Add Demo Player
              </MDButton>
            </Can>
          }
          canSearch
          canFilter
          fetchData={getPlayers}
          queryKey='players'
          columnData={cols}
          object={'player'}
          onDelete={onDelete}
          subrowFetchData={getPlayerAggregated}
          filtersComponent={<Filters filters={filters} setFilters={setFilters} />}
          filters={filters}
          noActions={filters?.isDemo == null || filters?.isDemo == false ? true : false}
        />{' '}
      </Can>
      <Can not I='read' a='user'>
        <Navigate to='/dashboard' />
      </Can>
    </>
  );
}

export default PlayerManagement;
