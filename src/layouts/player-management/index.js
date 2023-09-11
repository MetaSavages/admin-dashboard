import DataTablePage from 'components/DataTablePage';
import dataTablePlayersData from 'assets/mockData/dataTablePlayers';
import MDButton from 'components/MDButton';
import { useNavigate, Navigate } from 'react-router-dom';
import { Can } from 'context';
import { getPlayers, getPlayerAggregated } from 'services/players';
import { playerColumnData } from 'data/playerColumnData';
import Filters from './components/Filters';
import { useEffect, useState } from 'react';
function PlayerManagement() {
  const navigate = useNavigate();
  const onDelete = (id) => {
    console.log(id);
  };
  const [filters, setFilters] = useState({});
  const [cols, setCols] = useState(null);
  useEffect(() => {
    playerColumnData().then((res) => {
      setCols(res);
    });
  }, []);
  if (!cols) return <></>;
  return (
    <>
      <Can I='read' a='user'>
        <DataTablePage
          title='Player Management'
          canSearch
          canFilter
          fetchData={getPlayers}
          queryKey='players'
          columnData={cols}
          object={'player'}
          onDelete={onDelete}
          subrowFetchData={getPlayerAggregated}
          noActions
          filtersComponent={<Filters filters={filters} setFilters={setFilters} />}
          filters={filters}
        />{' '}
      </Can>
      <Can not I='read' a='user'>
        <Navigate to='/dashboard' />
      </Can>
    </>
  );
}

export default PlayerManagement;
