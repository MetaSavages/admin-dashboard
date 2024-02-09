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

import { useState, useEffect, useRef } from 'react';

// react-router components
import { useLocation, Link } from 'react-router-dom';

// prop-types is a library for typechecking of props.
import PropTypes from 'prop-types';

// @material-ui core components
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';
import MDInput from 'components/MDInput';
import MDBadge from 'components/MDBadge';

// Material Dashboard 2 PRO React examples
import Breadcrumbs from 'examples/Breadcrumbs';
import NotificationItem from 'examples/Items/NotificationItem';

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarDesktopMenu,
  navbarMobileMenu
} from 'components/DashboardNavbar/styles';

// Material Dashboard 2 PRO React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
  setDarkMode
} from 'context';
import MDAvatar from 'components/MDAvatar';
import { Skeleton, Switch } from '@mui/material';
import MDTypography from 'components/MDTypography';
import Notifications from 'components/Notifications';
import { io } from 'socket.io-client';
import { getNotifications, markAllAsRead } from 'services/notifications';

import './index.scss';

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode, name, email, role } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split('/').slice(1);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState({});
  const [isRead, setIsRead] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    const value = `; ${document.cookie}`;
    let parts = value.split(`; access_token=`);
    if (parts.length === 2) {
      parts = parts.pop().split(';').shift();
    }
    if (!parts) return;
    const socket = io(process.env.REACT_APP_WEBSOCKET_URL, {
      auth: {
        token: parts
      },
      path: '/admin-socket'
    });
    socket.on('login', (notifications) => {
      setNotificationCount(Number(notifications));
    });
    socket.on('notification', (notifications) => {
      setNotificationCount(Number(notifications));
    });
  }, []);
  useEffect(() => {
    const getNotificationsData = async () => {
      getNotifications()
        .then((res) => {
          if (res?.data.length > 0) {
            const unseenData = res.data.filter((data) => data.seen === false);
            setNotificationCount(unseenData.length);
          }

          setNotifications(res);
        })
        .catch((error) => {});
    };
    getNotificationsData();
  }, [isRead]);

  const handleNotificationScroll = async () => {
    const paper = menuRef?.current?.children[2];
    if (!paper) return;
    const scrollPosition = paper.scrollTop;
    const componentHeight = paper.scrollHeight - paper.clientHeight;
    if (componentHeight - scrollPosition <= 100) {
      const newNotifications = await getNotifications(notifications?.meta?.currentPage + 1);

      if (newNotifications?.data.length > 0) {
        const unseenData = newNotifications.data.filter((data) => data.seen === false);

        setNotificationCount(unseenData.length);
      }

      setNotifications({
        data: [...notifications?.data, ...newNotifications?.data],
        meta: newNotifications?.meta
      });
    }
  };

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType('sticky');
    } else {
      setNavbarType('static');
    }

    let prevScroll = window.scrollY;

    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      const currentScroll = window.scrollY;
      if ((currentScroll === 0 && prevScroll !== 0) || (currentScroll !== 0 && prevScroll === 0)) {
        setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
        prevScroll = currentScroll;
      }
    }

    // /**
    //  The event listener that's calling the handleTransparentNavbar function when
    //  scrolling the window.
    // */
    window.addEventListener('scroll', handleTransparentNavbar); // BAD LOGIC

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleDarkMode = () => {
    localStorage.setItem('darkMode', !darkMode);
    setDarkMode(dispatch, !darkMode);
  };
  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => {
    const ev = event.currentTarget;
    const getNotificationsData = async () => {
      setNotifications(await getNotifications());
      setOpenMenu(ev);
    };
    getNotificationsData();
  };
  const handleCloseMenu = () => setOpenMenu(false);
  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      ref={menuRef}
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      onScrollCapture={handleNotificationScroll}
      sx={{ mt: 2, height: '50%', overflowY: 'scroll' }}
    >
      {notifications?.data?.length && (
        <MDTypography
          sx={{ fontSize: '13px', textAlign: 'right', cursor: 'pointer', color: '#7d7d7d' }}
          onClick={() => {
            markAllAsRead();
            setIsRead(true);
          }}
        >
          Mark all as read
        </MDTypography>
      )}
      {notifications?.data?.length ? (
        notifications?.data?.map((notification) => (
          <NotificationItem
            key={notification.id}
            type={notification.type}
            notification={notification}
            darkMode={darkMode}
          />
        ))
      ) : (
        <MDTypography variant='button' fontWeight='regular' sx={{ ml: 1 }}>
          No notifications
        </MDTypography>
      )}
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    }
  });
  return (
    <AppBar
      position={absolute ? 'absolute' : navbarType}
      color='inherit'
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar className='toolbar' sx={(theme) => navbarContainer(theme)}>
        <MDBox display='flex' flexDirection='row'>
          <IconButton sx={navbarDesktopMenu} onClick={handleMiniSidenav} size='small' disableRipple>
            <MDBox sx={{ marginRight: '20px' }}>
              <Icon fontSize='medium' sx={iconsStyle}>
                {miniSidenav ? 'menu_open' : 'menu'}
              </Icon>
            </MDBox>
          </IconButton>
          <IconButton size='small' disableRipple color='inherit' sx={navbarMobileMenu} onClick={handleMiniSidenav}>
            <MDBox sx={{ marginRight: '20px' }}>
              <Icon sx={iconsStyle} fontSize='medium'>
                {miniSidenav ? 'menu_open' : 'menu'}
              </Icon>
            </MDBox>
          </IconButton>
          <MDBox color='inherit' mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
            <Breadcrumbs
              icon='home'
              title={route[route.length - 1]}
              route={route}
              light={light}
              handleMiniSidenav={handleMiniSidenav}
              iconsStyle={iconsStyle}
            />
          </MDBox>
        </MDBox>

        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox className='profile-info' flexDirection='column' sx={(theme) => navbarRow(theme, { isMini })}>
              {!(name && role) ? (
                <Skeleton variant='text' width={100} height={20} />
              ) : (
                <MDBox className='name-info'>
                  <MDTypography variant='h6'>{name}</MDTypography>
                  <MDTypography variant='subtitle2'>{role.name}</MDTypography>
                </MDBox>
              )}
              <MDBox>
                <MDBox color={light ? 'white' : 'inherit'}>
                  <IconButton
                    size='small'
                    color='inherit'
                    sx={navbarIconButton}
                    variant='contained'
                    disableRipple
                    onClick={handleDarkMode}
                  >
                    {darkMode ? <Icon sx={iconsStyle}>light_mode</Icon> : <Icon sx={iconsStyle}>dark_mode</Icon>}
                  </IconButton>
                  <Notifications
                    light={light}
                    darkMode={darkMode}
                    transparentNavbar={transparentNavbar}
                    handleOpenMenu={handleOpenMenu}
                    notificationCount={notificationCount}
                  />
                  <IconButton
                    size='small'
                    disableRipple
                    color='inherit'
                    sx={navbarIconButton}
                    onClick={handleConfiguratorOpen}
                  >
                    <Icon sx={iconsStyle}>settings</Icon>
                  </IconButton>
                  {/* <Link to='/authentication/sign-in/basic'>
                <IconButton sx={navbarIconButton} size='small' disableRipple>
                  <MDAvatar src='https://i.pravatar.cc/150?img=3' alt='user-avatar' />
                </IconButton>
              </Link> */}
                </MDBox>
              </MDBox>
            </MDBox>
            {renderMenu()}
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool
};

export default DashboardNavbar;
