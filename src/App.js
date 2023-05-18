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

import { useState, useEffect, useMemo } from 'react';

// react-router components
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// @mui material components
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React components
import MDBox from 'components/MDBox';

// Material Dashboard 2 PRO React examples
import Sidenav from 'components/Sidenav';
import Configurator from 'examples/Configurator';

// Material Dashboard 2 PRO React themes
import theme from 'assets/theme';
import themeRTL from 'assets/theme/theme-rtl';

// Material Dashboard 2 PRO React Dark Mode themes
import themeDark from 'assets/theme-dark';
import themeDarkRTL from 'assets/theme-dark/theme-rtl';
// RTL plugins
// import rtlPlugin from 'stylis-plugin-rtl'; // Commented this line to don't show the error
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// Material Dashboard 2 PRO React routes
import routes from 'routes';

// Material Dashboard 2 PRO React contexts
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator, setUser, setRole } from 'context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Images
import brand from 'assets/images/logo.png';
import { getCurrentUser } from 'services/auth';
import { useNavigate } from 'react-router-dom';
import { AbilityContext } from 'context';
import { getUserAbilities } from 'conig/ability';

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    user,
    darkMode
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [ability, setAbility] = useState(null);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: 'rtl'
      // stylisPlugins: [rtlPlugin] // Commented this line to don't show the error
    });

    setRtlCache(cacheRtl);
  }, []);
  const queryClient = new QueryClient();
  console.log('rerendering app');
  useMemo(() => {
    getCurrentUser()
      .then((user) => {
        console.log('fetching user data');
        setUser(dispatch, user.data.email);
        setRole(dispatch, user.data.role); // no role yet
        setAbility(getUserAbilities(user.data.role));
      })
      .catch((err) => {
        console.log(err);
        setUser(dispatch, null);
      });
  }, [dispatch]);
  // useEffect(() => {
  //   for (let i = 1; i <= 199; i++) {
  //     setTimeout(() => {
  //       axios.post(
  //         'http://localhost:3001/api/v1/users',
  //         {
  //           email: `test${i}@mail.com`,
  //           password: '12345678'
  //         },
  //         {
  //           withCredentials: true
  //         }
  //       );
  //     }, 100);
  //   }
  // }, []);

  // useEffect(() => {
  //   // Function to fetch data from the API
  //   const fetchUserSessiondata = () =>
  //     getCurrentUser()
  //       .then((user) => {
  //         console.log('fetching user data');
  //         setUser(dispatch, user.data.email);
  //         // setRole(dispatch, user.data?.role); // no role yet
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         setUser(dispatch, null);
  //       });

  //   // Interval time (in milliseconds) for polling
  //   const interval = 5000; // 5 seconds

  //   // Start polling when the component mounts
  //   const timerId = setInterval(fetchUserSessiondata, interval);

  //   // Stop polling and clean up when the component unmounts
  //   return () => {
  //     clearInterval(timerId);
  //   };
  // }, []);
  useEffect(() => {
    if (user !== null) {
      console.log('user is logged in');
    } else {
      console.log('user is not logged in');
      navigate('/authentication/sign-in/basic');
    }
  }, [user]);
  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute('dir', direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display='flex'
      justifyContent='center'
      alignItems='center'
      width='3.25rem'
      height='3.25rem'
      bgColor='white'
      shadow='sm'
      borderRadius='50%'
      position='fixed'
      right='2rem'
      bottom='2rem'
      zIndex={99}
      color='dark'
      sx={{ cursor: 'pointer' }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize='small' color='inherit'>
        settings
      </Icon>
    </MDBox>
  );
  if (ability === null && user) {
    return <></>;
  }
  return direction === 'rtl' ? (
    <AbilityContext.Provider value={ability}>
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={rtlCache}>
          <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
            <CssBaseline />
            {layout === 'dashboard' && (
              <>
                <Sidenav
                  color={sidenavColor}
                  brand={brand}
                  brandName='Toka City'
                  routes={routes}
                  onMouseEnter={handleOnMouseEnter}
                  onMouseLeave={handleOnMouseLeave}
                />
                <Configurator />
              </>
            )}
            {layout === 'vr' && <Configurator />}
            <Routes>
              {getRoutes(routes)}
              <Route path='*' element={<Navigate to='/dashboard' />} />
            </Routes>
          </ThemeProvider>
        </CacheProvider>
      </QueryClientProvider>
    </AbilityContext.Provider>
  ) : (
    <AbilityContext.Provider value={ability}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkMode ? themeDark : theme}>
          <CssBaseline />
          {layout === 'dashboard' && (
            <>
              <Sidenav
                color={sidenavColor}
                brand={brand}
                brandName='Toka City'
                routes={routes}
                onMouseEnter={handleOnMouseEnter}
                onMouseLeave={handleOnMouseLeave}
              />
              <Configurator />
            </>
          )}
          {layout === 'vr' && <Configurator />}
          <Routes>
            {getRoutes(routes)}
            <Route path='*' element={<Navigate to='/dashboard' />} />
          </Routes>
        </ThemeProvider>
      </QueryClientProvider>
    </AbilityContext.Provider>
  );
}
