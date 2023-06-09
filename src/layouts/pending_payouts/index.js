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
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox py={3}>
          <MDBox>
            <Grid container spacing={3} mb={3}>
              <Grid item xs={12}>
                <Card>
                  <MDBox p={3} lineHeight={1} display='flex' justifyContent='space-between'>
                    <MDTypography variant='h5' fontWeight='medium'>
                      Pending payouts
                    </MDTypography>
                  </MDBox>
                  <DataTable
                    canFilter
                    fetchData={fetchData}
                    queryKey='payouts'
                    columnData={dataPendingPayouts.columns}
                    object={'payout'}
                    noActions
                    filtersComponent={<Filters filters={filters} setFilters={setFilters} />}
                  />
                </Card>
              </Grid>
            </Grid>
          </MDBox>
        </MDBox>
        <Footer />
      </DashboardLayout>
    </LocalizationProvider>
  );
};

export default PendingPayouts;
