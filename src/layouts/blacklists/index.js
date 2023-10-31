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

// import Filters from './components/Filters';
import { Navigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import React, { useState } from 'react';
import DataTablePage from 'components/DataTablePage';
import { getEventsHistory } from 'services/analytics';
import dataTableBlacklistCountries from 'assets/mockData/dataBlacklistCountries';
import { Can } from 'context';
import Filters from './components/Filters';
function Blacklists() {
  const location = useLocation();
  const { search } = location;
  const [filters, setFilters] = useState(queryString.parse(search));

  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: dataTableBlacklistCountries.rows,
          meta: {
            totalItems: 10
          }
        });
      }, 100);
    });
  };

  return (
    <>
      <Can I='read' a='blacklist'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DataTablePage
            title='Blacklists'
            canFilter
            canSearch
            filtersComponent={<Filters filters={filters} setFilters={setFilters} />}
            fetchData={fetchData}
            queryKey={'metrics'}
            columnData={dataTableBlacklistCountries.columns}
            object={'metrics'}
            noActions
          />
        </LocalizationProvider>
      </Can>
      <Can not I='read' a='blacklist'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default Blacklists;
