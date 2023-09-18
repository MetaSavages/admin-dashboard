import Filters from './components/Filters';
import React from 'react';
import dataPendingDeposits from 'assets/mockData/dataPendingDeposits';
import DataTable from 'components/DataTablePage/components/DataTable';
import { Card } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import DataTablePage from 'components/DataTablePage';

import { pendingPaymentsColumnData } from 'data/pendingPaymentsColumnData'
import { getPendingDeposits } from 'services/deposits'

const PendingDeposits = () => {
  const [filters, setFilters] = React.useState({});

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DataTablePage
        title='Pending Deposits'
        canFilter
        fetchData={getPendingDeposits}
        queryKey='pending_deposits'
        columnData={pendingPaymentsColumnData}
        object={'pending_deposits'}
        noActions
        filtersComponent={<Filters filters={filters} setFilters={setFilters} />}
      />
    </LocalizationProvider>
  );
};

export default PendingDeposits;
