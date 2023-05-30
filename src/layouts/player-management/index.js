import DataTablePage from 'components/DataTablePage';
import dataTablePlayersData from 'assets/mockData/dataTablePlayers';
import MDButton from 'components/MDButton';
import { useNavigate, Navigate } from 'react-router-dom';
import { Can } from 'context';
import PlayerDataTablePage from './components/DataTablePage';
function PlayerManagement() {
  const navigate = useNavigate();
  const onDelete = (id) => {
    console.log(id);
  };
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: dataTablePlayersData.rows,
          meta: {
            totalItems: 100
          }
        });
      }, 100);
    });
  };

  return (
    <>
      <Can I='read' a='user'>
        <PlayerDataTablePage
          title='Player Management'
          createButton={
            <Can I='create' a='user'>
              <MDButton variant='contained' color='info' onClick={() => navigate('/player-management/new-player')}>
                Add Player
              </MDButton>
            </Can>
          }
          canSearch
          canFilter
          fetchData={fetchData}
          queryKey='players'
          columnData={dataTablePlayersData.columns}
          object={'player'}
          onDelete={onDelete}
        />{' '}
      </Can>
      <Can not I='read' a='user'>
        <Navigate to='/dashboard' />
      </Can>
    </>
  );
}

export default PlayerManagement;
