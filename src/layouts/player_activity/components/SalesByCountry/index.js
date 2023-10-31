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
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// Material Dashboard 2 PRO React examples
import SalesTable from 'examples/Tables/SalesTable';

import './legend_styles.css';
import { useMaterialUIController } from 'context';

function SalesByCountry({salesTable}) {
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
        <Grid item xs={12} md={12} lg={12}>
          <SalesTable rows={salesTable} shadow={false} />
        </Grid>
      </MDBox>
    </Card>
  );
}

export default SalesByCountry;
