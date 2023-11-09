import Filters from './components/Filters';
import React from 'react';
import dataPendingDeposits from 'assets/mockData/dataPendingDeposits';
import DataTable from 'components/DataTablePage/components/DataTable';
import { Card } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import DataTablePage from 'components/DataTablePage';

import { pendingPaymentsColumnData } from 'data/pendingPaymentsColumnData';
import { getPendingDeposits } from 'services/deposits';
import { Can } from 'context';
import { Navigate } from 'react-router-dom';

const PendingDeposits = () => {
  const [filters, setFilters] = React.useState({});

  return (
    <>
      <Can I='read' a='deposit'>
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
      </Can>
      <Can not I='read' a='deposit'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
};

export default PendingDeposits;
