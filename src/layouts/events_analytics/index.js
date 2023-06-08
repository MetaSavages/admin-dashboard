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
import ReportsBarChart from 'examples/Charts/BarCharts/ReportsBarChart';
import ReportsLineChart from 'examples/Charts/LineCharts/ReportsLineChart';
import ComplexStatisticsCard from 'examples/Cards/StatisticsCards/ComplexStatisticsCard';
import BookingCard from 'examples/Cards/BookingCard';

// Anaytics dashboard components
import SalesByCountry from 'layouts/player_activity/components/SalesByCountry';

// Data
import reportsBarChartData from 'layouts/player_activity/data/reportsBarChartData';
import reportsLineChartData from 'layouts/player_activity/data/reportsLineChartData';
import dataTableEventsData from 'assets/mockData/dataTableEvents';
import { Card } from '@mui/material';
// Images
import booking1 from 'assets/images/products/product-1-min.jpg';
import booking2 from 'assets/images/products/product-2-min.jpg';
import booking3 from 'assets/images/products/product-3-min.jpg';
import Filters from './components/Filters';

function EventsAnalytics() {
  const { sales, tasks } = reportsLineChartData;
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: dataTableEventsData.rows,
          meta: {
            totalItems: 10
          }
        });
      }, 100);
    });
  };

  // Action buttons for the BookingCard
  const actionButtons = (
    <>
      <Tooltip title='Refresh' placement='bottom'>
        <MDTypography variant='body1' color='primary' lineHeight={1} sx={{ cursor: 'pointer', mx: 3 }}>
          <Icon color='inherit'>refresh</Icon>
        </MDTypography>
      </Tooltip>
      <Tooltip title='Edit' placement='bottom'>
        <MDTypography variant='body1' color='info' lineHeight={1} sx={{ cursor: 'pointer', mx: 3 }}>
          <Icon color='inherit'>edit</Icon>
        </MDTypography>
      </Tooltip>
    </>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/* <MDBox mt={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color='dark'
                  title='Average event calls per day'
                  description='The average times of event calls per day'
                  date='just updated'
                  chart={tasks}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color='info'
                  title='User activity rate'
                  description='User activity rate'
                  date='just updated'
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
        <MDBox>
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12}>
              <Card>
                <MDBox p={3} lineHeight={1} display='flex' justifyContent='space-between'>
                  <MDTypography variant='h5' fontWeight='medium'>
                    Event calls
                  </MDTypography>
                </MDBox>
                <DataTable
                  canFilter={true}
                  filtersComponent={<Filters />}
                  fetchData={fetchData}
                  queryKey={'event'}
                  columnData={dataTableEventsData.columns}
                  object={'event'}
                  noActions={true}
                />
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default EventsAnalytics;
