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

import { forwardRef, useEffect, useState } from 'react';

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// @mui material components
import MenuItem from '@mui/material/MenuItem';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';

// custom styles for the NotificationItem
import menuItem from 'examples/Items/NotificationItem/styles';
import { Icon } from '@mui/material';
import { blue, grey } from '@mui/material/colors';
import { Button } from '@mui/base';
import { setNotificationToSeen } from 'services/notifications';

const NotificationItem = forwardRef(({ type, notification, darkMode, ...rest }, ref) => {
  const [message, setMessage] = useState('');
  const [redirect, setRedirect] = useState('');
  useEffect(() => {
    console.log(notification);
    switch (type) {
      case 'PROMO_CODE_REGISTRATION':
        if (notification?.user?.promoCode?.code != null) {
          setMessage(`${notification?.user?.nickname} has registered with code ${notification?.user?.promoCode?.code}`);
        } else {
          setMessage(`${notification?.user?.nickname} has registered using a promo code`);
        }
        setRedirect(`/player-management/show/${notification?.user?.id}`);
        break;
      case 'GAME_WIN':
        setMessage(
          `${notification?.user?.nickname} has won ${notification?.metric?.payload?.amount} on ${notification?.metric?.payload?.gameType}`
        );
        break;
      case 'DEPOSIT':
        setMessage(`${notification?.user?.nickname} has deposited ${notification?.metric?.payload?.amount}`);
        break;
      case 'WITHDRAWAL':
        setMessage(`${notification?.user?.nickname} has withdrawn ${notification?.metric?.payload?.amount}`);
    }
  }, [type]);

  const setSeen = async () => {
    await setNotificationToSeen(notification?.id);
    window.location.href = redirect;
  };
  return (
    <MenuItem {...rest} ref={ref} sx={(theme) => menuItem(theme)}>
      <MDBox py={0.5} display='flex' alignItems='center' lineHeight={1} onClick={setSeen}>
        {!notification?.seen && (
          <MDTypography>
            <Icon sx={{ color: blue[500], fontSize: '10px !important', textAlign: 'center' }}>circle</Icon>
          </MDTypography>
        )}

        <MDTypography
          variant='button'
          fontWeight='regular'
          sx={{ ml: 1 }}
          color={notification?.seen ? (darkMode ? 'light' : 'dark') : darkMode ? 'white' : 'black'}
        >
          {message}
        </MDTypography>
      </MDBox>
    </MenuItem>
  );
});

NotificationItem.propTypes = {
  type: PropTypes.string.isRequired,
  notification: PropTypes.object.isRequired,
  darkMode: PropTypes.bool
};

export default NotificationItem;
