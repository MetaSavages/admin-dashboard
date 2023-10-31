import DataTablePage from 'components/DataTablePage';
import blackjackSessionsColumnData from 'data/blackjackSessionsColumnData';
import { getBlackjackTables } from 'services/tables';

function BlackjackSessions() {
  return (
    <>
        <DataTablePage
          title='Blackjack Tables'
          fetchData={getBlackjackTables}
          queryKey='blackjack'
          columnData={blackjackSessionsColumnData}
          object={'blackjack'}
          noActions
        />
    </>
  );
}

export default BlackjackSessions;
