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

// prop-types is library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Card from '@mui/material/Card';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import { Divider } from '@mui/material';

function DoubleInfoCard({ title1, cap1, title2, cap2 }) {
  return (
    <Card display='flex'>
      <MDBox py={3} px={5} display='flex' justifyContent='space-around' alignItems='center'>
        <MDBox display='flex' flexDirection='column' alignItems='center'>
          <MDTypography variant='h5' fontWeight='medium' textTransform='capitalize'>
            {title1}
          </MDTypography>
          <MDTypography variant='body2' color='text' fontWeight='regular'>
            {cap1}
          </MDTypography>
        </MDBox>
        <Divider flexItem sx={{ height: '5rem', width: 2 }} orientation='vertical' variant='middle' />
        <MDBox display='flex' flexDirection='column' alignItems='center'>
          <MDTypography variant='h5' fontWeight='medium' textTransform='capitalize'>
            {title2}
          </MDTypography>
          <MDTypography variant='body2' color='text' fontWeight='regular'>
            {cap2}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of MiniInfoCard
DoubleInfoCard.defaultProps = {
  color: 'info'
};

// Typechecking props for the MiniInfoCard
DoubleInfoCard.propTypes = {
  title1: PropTypes.node.isRequired,
  cap1: PropTypes.string.isRequired,
  title2: PropTypes.node.isRequired,
  cap2: PropTypes.string.isRequired
};

export default DoubleInfoCard;
