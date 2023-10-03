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

// @react-jvectormap components
import { VectorMap } from '@react-jvectormap/core';
import { worldMerc } from '@react-jvectormap/world';

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
import ReportsLineChart from 'examples/Charts/LineCharts/ReportsLineChart';

// Anaytics dashboard components
import SalesByCountry from 'layouts/player_activity/components/SalesByCountry';

// Data
import reportsLineChartData from 'layouts/player_activity/data/reportsLineChartData';
import dataTableNewPlayersData from 'assets/mockData/dataTableNewPlayers';
import { Card, Skeleton } from '@mui/material';

import { useMaterialUIController } from 'context';

import { getNewPlayers, getPlayerCountries } from 'services/player_activity';

import { useEffect, useState } from 'react';
import useAxios from 'hooks/useAxios';
import { getEventsHistory, getNewRegistrations } from 'services/analytics';
import dayjs from 'dayjs';

function PlayerActivity() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const { sales, tasks } = reportsLineChartData;
  const api = useAxios();
  const [countryCodes, setCountryCodes] = useState([]);
  const [countryNames, setCountryNames] = useState('');
  const [userCountries, setUserCountries] = useState({});
  const [tableValues, setTableValues] = useState({});
  const [countryValues, setCountryValues] = useState({});
  const [salesTable, setSalesTable] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [newRegistrations, setNewRegistrations] = useState([]);
  const [correctMonths, setCorrectMonths] = useState([]);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  useEffect(() => {
    api
      .request('https://restcountries.com/v3.1/all')
      .then((response) => {
        const countryCodes = [];
        const countryNames = [];
        response.data.forEach((element) => {
          countryCodes.push([element.cca2, 0]);
          countryNames[element.cca2] = element.name.common;
        });
        setCountryCodes(countryCodes);
        setCountryNames(countryNames);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  let registrationsData = {
    labels: correctMonths,
    datasets: { label: 'Registrations', data: newRegistrations }
  };

  useEffect(() => {
    getNewRegistrations().then((res) => {
      let registrations = res.map((m) => {
        m[0] === 12
          ? setCorrectMonths((prev) => [...prev, months[0]])
          : setCorrectMonths((prev) => [...prev, months[m[0]]]);
        return m[1];
      });
      setNewRegistrations(registrations);
    });
  }, []);

  useEffect(() => {
    getPlayerCountries().then((res) => {
      setUserCountries(res.data);
      setTableValues(res.data);
    });
  }, []);

  const countCountries = (data) => {
    let res = {};
    countryCodes.forEach((country) => {
      data.forEach((userCountry) => {
        if (country[0] === userCountry.country) {
          res[userCountry.country] = userCountry.active;
        } else {
          res[country[0]] = 0;
        }
      });
    });
    setCountryValues(res);
  };

  useEffect(() => {
    countCountries(userCountries);
  }, [userCountries]);

  const handleSalesTable = () => {
    let values = [{}];
    tableValues.map((res) => {
      values.push({
        country: [res?.country ? res.country : '-', countryNames[res.country] ? countryNames[res.country] : '-'],
        registered: res?.registered ? res.registered : 0,
        active: res?.active ? res.active : 0
      });
    });
    setSalesTable(values);
  };

  useEffect(() => {
    if (tableValues.length > 0) {
      setLoading(false);
      handleSalesTable();
    }
  }, [tableValues]);

  const findCountryValue = (country) => {
    let number = 0;
    Object.entries(countryValues).find(([key, value]) => {
      if (key == country) {
        number = value;
      }
    });
    return number;
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
        <Grid container spacing={5}>
          <Grid item xs={6} md={6} lg={6}>
            <MDBox>
              <SalesByCountry salesTable={salesTable} />
              <MDBox mb={3} mt={5}>
                {newRegistrations.length > 0 ? (
                  <ReportsLineChart
                    color='dark'
                    title='User registration rate'
                    description='User registration rate'
                    date='just updated'
                    chart={registrationsData}
                  />
                ) : (
                  <Skeleton height={300} />
                )}
              </MDBox>
            </MDBox>
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            {loading && !countryValues.length ? (
              <Skeleton />
            ) : (
              <VectorMap
                map={worldMerc}
                zoomOnScroll={false}
                zoomButtons={false}
                backgroundColor='transparent'
                onRegionTipShow={(e, el, code) => {
                  el.html(el.html() + ` <br> Active users: ${findCountryValue(code)}`);
                }}
                regionStyle={{
                  initial: {
                    fill: '#8a836b',
                    'fill-opacity': 1,
                    stroke: 'none',
                    'stroke-width': 0,
                    'stroke-opacity': 0
                  }
                }}
                series={{
                  regions: [
                    {
                      scale: ['#8a836b', '#c7e9b4', '#7fcdbb', '#41b6c4', '#2c7fb8', '#253494'],
                      attribute: 'fill',
                      values: countryValues,
                      hoverOpacity: 0.7,
                      hoverColor: true,
                      normalizeFunction: 'polynomial',
                      legend: {
                        vertical: true,
                        title: 'Active users',
                        cssClass: darkMode ? 'dark' : 'light'
                      }
                    }
                  ]
                }}
              />
            )}
          </Grid>
        </Grid>

        <MDBox>
          <Grid container spacing={3} mb={3}>
            <Grid item xs={12}>
              <Card>
                <MDBox p={3} lineHeight={1} display='flex' justifyContent='space-between'>
                  <MDTypography variant='h5' fontWeight='medium'>
                    New Players
                  </MDTypography>
                </MDBox>
                <DataTable
                  canSearch={false}
                  canFilter={false}
                  fetchData={getNewPlayers}
                  queryKey={'new_payer'}
                  columnData={dataTableNewPlayersData.columns}
                  object={'new_payer'}
                  noActions
                  defaultPageSize={10}
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

export default PlayerActivity;
