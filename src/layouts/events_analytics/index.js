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
import DataTablePage from 'components/DataTablePage';
import { eventsColumnData } from 'data/eventsColumnData';
import { getEventsAggregated } from 'services/analytics';
import { useState } from 'react';
import { Can } from 'context';
import { Navigate } from 'react-router-dom';
function EventsAnalytics() {
  const { sales, tasks } = reportsLineChartData;
  const [filters, setFilters] = useState({});
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
    <>
      <Can I='read' a='metric'>
        <DataTablePage
          canFilter
          filtersComponent={<Filters filters={filters} setFilters={setFilters} />}
          fetchData={getEventsAggregated}
          queryKey={'event'}
          columnData={eventsColumnData}
          object={'event'}
          noActions
          filters={filters}
        />
      </Can>
      <Can not I='read' a='metric'>
        <Navigate to='/dashboard' replace />
      </Can>
    </>
  );
}

export default EventsAnalytics;
