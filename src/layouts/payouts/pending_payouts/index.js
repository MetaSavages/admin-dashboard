import Filters from './components/Filters';
import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DataTablePage from 'components/DataTablePage';
import { getPendingWithdraws } from 'services/withdraws'
import { pendingWithdrawsColumnData } from 'data/pendingWithdrawsColumnData'

const PendingPayouts = () => {
  const [filters, setFilters] = React.useState({});

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DataTablePage
        title='Pending Payouts'
        canFilter
        fetchData={getPendingWithdraws}
        queryKey='payouts'
        columnData={pendingWithdrawsColumnData}
        object={'payout'}
        noActions
        filtersComponent={<Filters filters={filters} setFilters={setFilters} />}
      />
    </LocalizationProvider>
  );
};

export default PendingPayouts;
