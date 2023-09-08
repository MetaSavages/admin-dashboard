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

// @mui material components
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import DataTable from 'components/DataTablePage/components/DataTable';
// Material Dashboard 2 PRO React examples
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'examples/Footer';

import dataTableEventHistory from 'assets/mockData/dataEventHistory';
import { Card } from '@mui/material';
// Images

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import Filters from './components/Filters';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import React, { useState } from 'react';
import DataTablePage from 'components/DataTablePage';
import { getEventsHistory } from 'services/analytics';
import eventHistoryColumnData from 'data/eventHistoryColumnData';
function EventHistory() {
  const location = useLocation();
  const { search } = location;
  console.log('search', search);
  const [filters, setFilters] = useState(queryString.parse(search));

  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: dataTableEventHistory.rows,
          meta: {
            totalItems: 10
          }
        });
      }, 100);
    });
  };
  const getGameInfo = (row) => {
    console.log(row);
    return [{ username: row.amount, event_type: row.gameType }];
  };

  return (
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
      />
    </LocalizationProvider>
  );
}

export default EventHistory;
