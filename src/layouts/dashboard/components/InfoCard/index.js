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
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

function InfoCard({ color, icon, title, description }) {
  return (
    <Card width={'4rem'} sx={{ height: '100%' }}>
      <MDBox p={3} display='flex' justifyContent='space-between' alignItems='center'>
        <MDBox
          display='grid'
          justifyContent='center'
          alignItems='center'
          bgColor={color}
          color='white'
          width='2rem'
          height='2rem'
          shadow='md'
          borderRadius='lg'
          variant='gradient'
          mr={2}
          px={2}
        >
          <Icon fontSize='default'>{icon}</Icon>
        </MDBox>
        <MDBox mt={1}>
          <MDTypography variant='h5' fontWeight='medium' textTransform='capitalize' fontSize='1.2rem'>
            {title}
          </MDTypography>
          <MDTypography variant='body2' color='text' fontWeight='regular' fontSize='1.2rem'>
            {description}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of MiniInfoCard
InfoCard.defaultProps = {
  color: 'info'
};

// Typechecking props for the MiniInfoCard
InfoCard.propTypes = {
  color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error', 'dark']),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired
};

export default InfoCard;
