import Filters from './components/Filters';
import React from 'react';
import dataPendingDeposits from 'assets/mockData/dataPendingDeposits';
import DataTable from 'components/DataTablePage/components/DataTable';
import { Card } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import DataTablePage from 'components/DataTablePage';

const PendingDeposits = () => {
  const [filters, setFilters] = React.useState({});
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: dataPendingDeposits.rows,
          meta: {
            totalItems: 10
          }
        });
      }, 100);
    });
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DataTablePage
        title='Pending Deposits'
        canFilter
        fetchData={fetchData}
        queryKey='pending_deposits'
        columnData={dataPendingDeposits.columns}
        object={'pending_deposits'}
        noActions
        filtersComponent={<Filters filters={filters} setFilters={setFilters} />}
      />
    </LocalizationProvider>
  );
};

export default PendingDeposits;
