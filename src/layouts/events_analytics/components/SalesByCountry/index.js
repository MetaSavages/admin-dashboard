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
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// Material Dashboard 2 PRO React examples
import SalesTable from 'examples/Tables/SalesTable';

// Data
import salesTableData from 'layouts/player_activity/components/SalesByCountry/data/salesTableData';
import './legend_styles.css';
import { useMaterialUIController } from 'context';
import { useEffect, useState } from 'react';
function SalesByCountry() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <Card sx={{ width: '100%' }}>
      <MDBox display='flex'>
        <MDBox
          display='flex'
          justifyContent='center'
          alignItems='center'
          width='4rem'
          height='4rem'
          variant='gradient'
          bgColor='info'
          color='white'
          shadow='md'
          borderRadius='xl'
          ml={3}
          mt={-2}
        >
          <Icon fontSize='medium' color='inherit'>
            language
          </Icon>
        </MDBox>
        <MDTypography variant='h6' sx={{ mt: 2, mb: 1, ml: 2 }}>
          Most active countries
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <Grid container>
          <Grid item xs={12} md={5} lg={5}>
            <SalesTable rows={salesTableData} shadow={false} />
          </Grid>
          <Grid item xs={12} md={7} lg={7} sx={{ mt: { xs: 5, lg: 0 } }}>
            <VectorMap
              map={worldMerc}
              zoomOnScroll={false}
              zoomButtons={false}
              backgroundColor='transparent'
              onRegionTipShow={(e, el, code) => {
                el.html(el.html() + ` <br> Active users: 152`);
              }}
              regionStyle={{
                initial: {
                  fill: '#dee2e7',
                  'fill-opacity': 1,
                  stroke: 'none',
                  'stroke-width': 0,
                  'stroke-opacity': 0
                }
              }}
              style={{
                marginTop: '-1.5rem'
              }}
              series={{
                regions: [
                  {
                    scale: ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#2c7fb8', '#253494'],
                    attribute: 'fill',
                    values: {
                      AF: 16.63,
                      AL: 11.58,
                      CD: 5.2,
                      CN: 200,
                      DZ: 158.97,
                      LY: 300,
                      PK: 74.77,
                      IQ: 45,
                      IR: 30,
                      SA: 195.2,
                      US: 1000
                    },
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
          </Grid>
        </Grid>
      </MDBox>
    </Card>
  );
}

export default SalesByCountry;
