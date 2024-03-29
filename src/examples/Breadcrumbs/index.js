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

// react-router-dom components
import { Link, useNavigate } from 'react-router-dom';

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// @mui material components
import { Breadcrumbs as MuiBreadcrumbs } from '@mui/material';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import { useMaterialUIController } from 'context';

import './index.scss';

function Breadcrumbs({ icon, title, route, light, handleMiniSidenav, iconsStyle }) {
  const routes = route.slice(0, -1);
  const navigate = useNavigate();
  const [controller] = useMaterialUIController();
  const { miniSidenav } = controller;

  const handleReturnClick = () => {
    // Go back to the previous page
    history.goBack();
  };
  return (
    <MDBox className='breadcrumbs' mr={{ xs: 0, xl: 8 }}>
      <MuiBreadcrumbs
        className='navigation'
        sx={{
          '& .MuiBreadcrumbs-separator': {
            color: ({ palette: { white, grey } }) => (light ? white.main : grey[600])
          }
        }}
      >
        <MDBox sx={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
          <MDTypography
            className='return-back'
            component='span'
            variant='body2'
            color={light ? 'white' : 'dark'}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            <Icon>undo</Icon>
          </MDTypography>
        </MDBox>
        <Link to='/'>
          <MDTypography
            component='span'
            variant='body2'
            color={light ? 'white' : 'dark'}
            opacity={light ? 0.8 : 0.5}
            sx={{ lineHeight: 0 }}
          >
            <Icon>{icon}</Icon>
          </MDTypography>
        </Link>

        {routes.map((el) => (
          <Link to={`/${el}`} key={el}>
            <MDTypography
              component='span'
              variant='button'
              fontWeight='regular'
              textTransform='capitalize'
              color={light ? 'white' : 'dark'}
              opacity={light ? 0.8 : 0.5}
              sx={{ lineHeight: 0 }}
            >
              {el}
            </MDTypography>
          </Link>
        ))}
        <MDTypography
          variant='button'
          fontWeight='regular'
          textTransform='capitalize'
          color={light ? 'white' : 'dark'}
          sx={{ lineHeight: 0 }}
        >
          {title.replace('-', ' ')}
        </MDTypography>
      </MuiBreadcrumbs>
      <MDTypography
        className='mt-10'
        fontWeight='bold'
        textTransform='capitalize'
        variant='h6'
        color={light ? 'white' : 'dark'}
        noWrap
      >
        {title.replace('-', ' ')}
      </MDTypography>
    </MDBox>
  );
}

// Setting default values for the props of Breadcrumbs
Breadcrumbs.defaultProps = {
  light: false
};

// Typechecking props for the Breadcrumbs
Breadcrumbs.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  route: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  light: PropTypes.bool
};

export default Breadcrumbs;
