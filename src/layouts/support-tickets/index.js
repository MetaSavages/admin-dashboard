import DataTablePage from 'components/DataTablePage';
import { Navigate, useNavigate } from 'react-router-dom';
import { Can } from 'context';
import supportTicketsColumnData from 'data/supportTicketsColumnData';
import dataSupportTickets from 'assets/mockData/dataSupportTickets';
import { getTickets } from 'services/support';
function SupportTickets() {
  const navigate = useNavigate();
  const onDelete = (id) => {
    console.log(id);
  };
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: dataSupportTickets.rows,
          meta: {
            totalItems: 100
          }
        });
      }, 100);
    });
  };

  return (
    <>
      <Can I='read' a='support'>
        <DataTablePage
          title='Support Tickets'
          canSearch
          canFilter
          fetchData={getTickets}
          queryKey='support'
          columnData={supportTicketsColumnData}
          object={'support'}
          noActions
          //filtersComponent={<Filters filters={filters} setFilters={setFilters} />} <Filters
        />
      </Can>
      <Can not I='read' a='support'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default SupportTickets;
