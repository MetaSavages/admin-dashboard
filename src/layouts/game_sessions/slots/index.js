import DataTablePage from 'components/DataTablePage';
import slotsSessionsColumnData from 'data/slotsSessionsColumnData';
import { getSlotTables } from 'services/tables';

function SlotSessions() {
  return (
    <>
      <DataTablePage
        title='Slot Tables'
        fetchData={getSlotTables}
        queryKey='slot_tables'
        columnData={slotsSessionsColumnData}
        object={'slot_tables'}
        noActions
      />
    </>
  );
}

export default SlotSessions;
