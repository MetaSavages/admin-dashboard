import DataTablePage from 'components/DataTablePage';
import { Navigate, useNavigate } from 'react-router-dom';
import { Can } from 'context';
import supportTicketsColumnData from 'data/supportTicketsColumnData';
import dataSupportTickets from 'assets/mockData/dataSupportTickets';
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
      <Can I='read' a='ticket'>
        <DataTablePage
          title='Support Tickets'
          canSearch
          canFilter
          fetchData={fetchData}
          queryKey='support-tickets'
          columnData={supportTicketsColumnData}
          object={'support-ticket'}
          noActions
          //filtersComponent={<Filters filters={filters} setFilters={setFilters} />} <Filters
        />
      </Can>
      <Can not I='read' a='ticket'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default SupportTickets;
