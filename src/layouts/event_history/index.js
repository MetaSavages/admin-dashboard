/**
=========================================================
* Material Dashboard 2 PRO React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Filters from './components/Filters';
import { Navigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import React, { useState } from 'react';
import DataTablePage from 'components/DataTablePage';
import { getEventsHistory } from 'services/analytics';
import eventHistoryColumnData from 'data/eventHistoryColumnData';
import { Can } from 'context';

function EventHistory() {
  const location = useLocation();
  const { search } = location;

  const [filters, setFilters] = useState({
    users: queryString.parse(search)?.userId ? [{ id: queryString.parse(search)?.userId }] : [],
    eventTypes: queryString.parse(search)?.eventType ? [{ id: Number(queryString.parse(search)?.eventType) }] : [],
    casinos: queryString.parse(search)?.casinoId ? [{ id: queryString.parse(search)?.casinoId }] : [],
    countries: queryString.parse(search)?.country ? [queryString.parse(search)?.country] : []
  });

  const getGameInfo = (row) => {
    console.log(row);
    return [{ username: row.amount, event_type: row.gameType }];
  };

  return (
    <>
      <Can I='read' a='metric'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DataTablePage
            title='Event History'
            canFilter
            filtersComponent={<Filters filters={filters} setFilters={setFilters} />}
            fetchData={getEventsHistory}
            queryKey={'metrics'}
            columnData={eventHistoryColumnData}
            object={'metrics'}
            noActions
            subrowFetchData={getGameInfo}
            filters={filters}
          />
        </LocalizationProvider>
      </Can>
      <Can not I='read' a='metric'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default EventHistory;
