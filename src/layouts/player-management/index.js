import DataTablePage from 'components/DataTablePage';
import dataTablePlayersData from 'assets/mockData/dataTablePlayers';
function PlayerManagement() {
  return <DataTablePage title='Player Management' data={dataTablePlayersData} canSearch canFilter />;
}

export default PlayerManagement;
