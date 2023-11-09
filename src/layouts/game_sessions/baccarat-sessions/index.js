import DataTablePage from 'components/DataTablePage';
import baccaratSessionsColumnData from 'data/baccaratSessionsColumnData';
import { getBaccaratTables } from 'services/tables';

function BaccaratSessions() {
  return (
    <>
      <DataTablePage
        title='Baccarat Tables'
        fetchData={getBaccaratTables}
        queryKey='baccarat_tables'
        columnData={baccaratSessionsColumnData}
        object={'baccarat_tables'}
        noActions
      />
    </>
  );
}

export default BaccaratSessions;
