import React, { useState, useEffect } from 'react';
import DataTablePage from 'components/DataTablePage';
import { Navigate, useNavigate } from 'react-router-dom';
import { Can } from 'context';
import supportTicketsColumnData from 'data/supportTicketsColumnData';
import dataSupportTickets from 'assets/mockData/dataSupportTickets';
import { getTickets } from 'services/support';

function SupportTickets() {

    // const [tickets, setTickets] = useState([]);
    
    // useEffect(() => {
    //   // Fetch tickets data from the API
    //   const fetchData = async () => {
    //     try {
    //       const ticketsData = await getTickets(); // Assuming getTickets is a function that fetches data
    //       setTickets(ticketsData);
    //     } catch (error) {
    //       console.error('Error fetching tickets:', error);
    //     }
    //   };
  
    //   fetchData();
    // }, []); 

  // useEffect(() => {
  //   if (searchParams.get('code')) {
  //     setFilters(filters.length ? '' : 'd');
  //     searchParams.delete('code');
  //   }
  //   setSearchParams(searchParams);
  // }, [location.search]);    

  return (
    <>
      <Can I='read' a='support'>
        <DataTablePage
          title='Support Tickets'
          canSearch
          canFilter
          fetchData={getTickets}
          // data={tickets} 
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
