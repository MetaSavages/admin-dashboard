import React, { useState, useEffect } from 'react';
import DataTablePage from 'components/DataTablePage';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Can } from 'context';
import supportTicketsColumnData from 'data/supportTicketsColumnData';
import { getTickets } from 'services/support';

function SupportTickets() {

    const [filters, setFilters] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
      if (searchParams.get('support')) {
       setFilters({
              ...filters,
              refresh: filters?.refresh ? !filters.refresh : true
            });
        searchParams.delete('support');
      }
      setSearchParams(searchParams);
    }, [location.search]);    

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
          filters={filters}
        />
      </Can>
      <Can not I='read' a='support'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default SupportTickets;
