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
import { Icon } from '@mui/material';
import { useEffect, useState } from 'react';

function CasinoCard({ allBets, gameWinsAmount, gameLoseAmount, image, title, description, action }) {
  const [gameProfit, setGameProfit] = useState(0);

  useEffect(() => {
    setGameProfit(Number(gameWinsAmount) - Number(gameLoseAmount));
  }, [gameWinsAmount, gameLoseAmount]);

  return (
    <>
      <MDBox position='relative' borderRadius='lg' mt={-3} mx={2} display='flex' justifyContent='center'>
        <MDBox
          component='img'
          src={image}
          alt={title}
          borderRadius='lg'
          shadow='md'
          width='100%'
          position='relative'
          zIndex={1}
          sx={{ height: '250px', objectFit: 'contain' }}
        />
        {/* <MDBox
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
        /> */}
      </MDBox>
      <MDBox px={3}>
        <MDBox display='flex' justifyContent='space-around' alignItems='center' gap={10} ml={4} mr={4} mt={2}>
          <MDBox display='flex' alignItems='center'>
            <Icon fontSize='large' color='info'>
              business_center
            </Icon>
            <MDBox ml={1}>
              <MDTypography display='inline' variant='h5' textTransform='capitalize' fontWeight='bold'>
                {allBets}
              </MDTypography>
              <MDTypography variant='caption' component='p' color='text' mt={-0.75} sx={{ fontSize: '1rem' }}>
                All bets
              </MDTypography>
            </MDBox>
          </MDBox>
          <MDBox display='flex' alignItems='center'>
            <Icon fontSize='large' color='success'>
              shopping_cart
            </Icon>
            <MDBox ml={1}>
              <MDTypography display='inline' variant='h5' textTransform='capitalize' fontWeight='bold'>
                {gameWinsAmount}
              </MDTypography>
              <MDTypography variant='caption' component='p' color='text' mt={-0.75} sx={{ fontSize: '1rem' }}>
                All wins Amount
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox p={3} ml={4} mr={4} mb={3}>
        <MDTypography display='flex' variant='h4' textTransform='capitalize' fontWeight='bold' justifyContent='center'>
          {gameProfit >= 0 ? `$${gameProfit}` : `-$${Math.abs(gameProfit)}`}
          {/* -${2 - 100} */}
        </MDTypography>
        <MDBox mb={3} mt={-0.5} display='flex' justifyContent='center'>
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
          <MDBox display='flex' justifyContent='space-around' gap={10}>
            <Link to={action.route}>
              <MDButton color={action.color ? action.color : 'dark'}>{action.label}</MDButton>
            </Link>
            <Link to={action.route}>
              <MDButton color={action.color ? action.color : 'dark'}>{action.label}</MDButton>
            </Link>
          </MDBox>
        )}
      </MDBox>
    </>
  );
}

// Typechecking props for the CasinoCard
CasinoCard.propTypes = {
  allBets: PropTypes.number.isRequired,
  gameWinsAmount: PropTypes.number.isRequired,
  gameLoseAmount: PropTypes.number.isRequired,
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
