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
import { Navigate, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import React, { useState } from 'react';
import DataTablePage from 'components/DataTablePage';
import { Can } from 'context';
import Filters from './components/Filters';
import { getBlacklistedCountries } from 'services/blacklists';
import blacklistsColumnData from 'data/blacklistsColumnData';

function Blacklists() {
  const location = useLocation();
  const { search } = location;
  const [filters, setFilters] = useState(queryString.parse(search));

  return (
    <>
      <Can I='read' a='blacklist'>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DataTablePage
            title='Blacklists'
            canFilter
            canSearch
            filtersComponent={<Filters filters={filters} setFilters={setFilters} />}
            fetchData={getBlacklistedCountries}
            queryKey={'metrics'}
            columnData={blacklistsColumnData}
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
