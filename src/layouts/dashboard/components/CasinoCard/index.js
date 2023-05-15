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

// react-router components
import { Link } from 'react-router-dom';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// @mui material components
import Card from '@mui/material/Card';
import MuiLink from '@mui/material/Link';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';
import { Icon, Typography } from '@mui/material';

function CasinoCard({ image, title, description, action }) {
  return (
    <Card>
      <MDBox position='relative' borderRadius='lg' mt={-3} mx={2}>
        <MDBox
          component='img'
          src={image}
          alt={title}
          borderRadius='lg'
          shadow='md'
          width='100%'
          height='100%'
          position='relative'
          zIndex={1}
        />
        <MDBox
          borderRadius='lg'
          shadow='md'
          width='100%'
          height='100%'
          position='absolute'
          left={0}
          top='3%'
          sx={{
            backgroundImage: `url(${image})`,
            transform: 'scale(0.94)',
            filter: 'blur(12px)',
            backgroundSize: 'cover'
          }}
        />
      </MDBox>
      <MDBox pl={3} pr={3}>
        <MDBox display='flex' justifyContent='space-between' alignItems='center' ml={4} mr={4} mt={2}>
          <MDBox display='flex' alignItems='center'>
            <Icon fontSize='large' color='info'>
              business_center
            </Icon>
            <MDBox ml={2}>
              <MDTypography display='inline' variant='h5' textTransform='capitalize' fontWeight='bold'>
                1123
              </MDTypography>
              <MDTypography variant='caption' component='p' color='text'>
                Rounds a day
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox display='flex' alignItems='center'>
            <Icon fontSize='large' color='success'>
              shopping_cart
            </Icon>
            <MDBox ml={2}>
              <MDTypography display='inline' variant='h5' textTransform='capitalize' fontWeight='bold'>
                81K
              </MDTypography>
              <MDTypography variant='caption' component='p' color='text'>
                Cashout requests
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox p={3} ml={4} mr={4} mb={4}>
        <MDTypography display='inline' variant='h4' textTransform='capitalize' fontWeight='bold'>
          $405,321,321
        </MDTypography>
        <MDBox mt={1} mb={3}>
          <MDTypography variant='subtitle2' component='p' color='info'>
            Life time sales
          </MDTypography>
        </MDBox>
        {action.type === 'external' ? (
          <MDBox display='flex' justifyContent='space-between'>
            <MuiLink href={action.route} target='_blank' rel='noreferrer'>
              <MDButton color={action.color ? action.color : 'dark'}>{action.label}</MDButton>
            </MuiLink>
            <MuiLink href={action.route} target='_blank' rel='noreferrer'>
              <MDButton color={action.color ? action.color : 'dark'}>{action.label}</MDButton>
            </MuiLink>
          </MDBox>
        ) : (
          <MDBox display='flex' justifyContent='space-between'>
            <Link to={action.route}>
              <MDButton color={action.color ? action.color : 'dark'}>{action.label}</MDButton>
            </Link>
            <Link to={action.route}>
              <MDButton color={action.color ? action.color : 'dark'}>{action.label}</MDButton>
            </Link>
          </MDBox>
        )}
      </MDBox>
    </Card>
  );
}

// Typechecking props for the CasinoCard
CasinoCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(['external', 'internal']).isRequired,
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf(['primary', 'secondary', 'info', 'success', 'warning', 'error', 'dark', 'light', 'default']),
    label: PropTypes.string.isRequired
  }).isRequired
};

export default CasinoCard;
