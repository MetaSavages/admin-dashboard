import DataTablePage from 'components/DataTablePage';
import rouletteSessionsTableData from 'data/rouletteSessionsColumnData';
import { getRouletteTables } from 'services/tables';

function RouletteSessions() {
  return (
    <>
      <DataTablePage
        title='Roulette Tables'
        fetchData={getRouletteTables}
        queryKey='roulette_tables'
        columnData={rouletteSessionsTableData}
        object={'roulette_tables'}
        noActions
      />
    </>
  );
}

export default RouletteSessions;
