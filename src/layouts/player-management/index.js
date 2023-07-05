import DataTablePage from 'components/DataTablePage';
import dataTablePlayersData from 'assets/mockData/dataTablePlayers';
import MDButton from 'components/MDButton';
import { useNavigate, Navigate } from 'react-router-dom';
import { Can } from 'context';
import { getPlayers, getPlayerAggregated } from 'services/players';
import { playerColumnData } from 'data/playerColumnData';
function PlayerManagement() {
  const navigate = useNavigate();
  const onDelete = (id) => {
    console.log(id);
  };

  console.log('playerColumnData', getPlayerAggregated);

  return (
    <>
      <Can I='read' a='user'>
        <DataTablePage
          title='Player Management'
          canSearch
          canFilter
          fetchData={getPlayers}
          queryKey='players'
          columnData={playerColumnData}
          object={'player'}
          onDelete={onDelete}
          subrowFetchData={getPlayerAggregated}
          noActions
        />{' '}
      </Can>
      <Can not I='read' a='user'>
        <Navigate to='/dashboard' />
      </Can>
    </>
  );
}

export default PlayerManagement;
