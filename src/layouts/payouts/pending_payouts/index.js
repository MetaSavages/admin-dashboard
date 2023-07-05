import Filters from './components/Filters';
import React from 'react';
import dataPendingPayouts from 'assets/mockData/dataPedningPayouts';
import DataTable from 'components/DataTablePage/components/DataTable';
import { Card } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DashboardLayout from 'examples/LayoutContainers/DashboardLayout';
import DashboardNavbar from 'components/DashboardNavbar';
import Footer from 'examples/Footer';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import Grid from '@mui/material/Grid';
import DataTablePage from 'components/DataTablePage';

const PendingPayouts = () => {
  const [filters, setFilters] = React.useState({});
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: dataPendingPayouts.rows,
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
        title='Pending Payouts'
        canFilter
        fetchData={fetchData}
        queryKey='payouts'
        columnData={dataPendingPayouts.columns}
        object={'payout'}
        noActions
        filtersComponent={<Filters filters={filters} setFilters={setFilters} />}
      />
    </LocalizationProvider>
  );
};

export default PendingPayouts;
