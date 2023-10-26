import DataTablePage from 'components/DataTablePage';
import crashSessionsColumnData from 'data/crashSessionsColumnData';
import { getCrashTables } from 'services/tables';

function CrashSessions() {
  return (
    <>
      <DataTablePage
        title='Crash Tables'
        fetchData={getCrashTables}
        queryKey='crash_tables'
        columnData={crashSessionsColumnData}
        object={'crash_tables'}
        noActions
      />
    </>
  );
}

export default CrashSessions;
