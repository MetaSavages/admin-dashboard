import DataTablePage from 'components/DataTablePage';
import jetpackSessionsColumnData from 'data/jetpackSessionsColumnData';
import { getJetpackTables } from 'services/tables';

function JetpackSessions() {
  return (
    <>
      <DataTablePage
        title='Jetpack Tables'
        fetchData={getJetpackTables}
        queryKey='jetpack_tables'
        columnData={jetpackSessionsColumnData}
        object={'jetpack_tables'}
        noActions
      />
    </>
  );
}

export default JetpackSessions;
