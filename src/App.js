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
import {
  useMaterialUIController,
  setMiniSidenav,
  setOpenConfigurator,
  setEmail,
  setName,
  setRole,
  setAbility
} from 'context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// Images
import brand from 'assets/images/logo.png';
import { getCurrentUser } from 'services/auth';
import { useNavigate } from 'react-router-dom';
import { AbilityContext } from 'context';
import { getUserAbilities } from 'config/ability';

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
    ability,
    name,
    email,
    darkMode,
    setTwoFactor
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const [fetchingUser, setFetchingUser] = useState(true);
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
  useMemo(() => {
    getCurrentUser()
      .then((user) => {
        setAbility(dispatch, getUserAbilities(user.role));
        setName(dispatch, `${user.firstName} ${user.lastName}`);
        setEmail(dispatch, user.email);
        setRole(dispatch, user.role); // no role yet
        setTwoFactor(dispatch, user?.isTwoFactorAuthenticationEnabled);
        setFetchingUser(false);
      })
      .catch((err) => {
        console.log(err);
        setName(dispatch, null);
        setEmail(dispatch, null);
        setRole(dispatch, null);
        setAbility(dispatch, null);
        setFetchingUser(false);
      });
  }, [dispatch]);

  useEffect(() => {
    if (fetchingUser) {
      return;
    }
    if (name == null || email == null || ability == null) {
      navigate('/authentication/sign-in/basic');
    }
  }, [name, email, ability, fetchingUser]);
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

  if (ability === undefined) {
    return <></>;
  }
  return direction === 'rtl' ? (
    <AbilityContext.Provider value={ability}>
      <QueryClientProvider client={queryClient}>
        <CacheProvider value={rtlCache}>
          <ThemeProvider theme={darkMode ? themeDarkRTL : themeRTL}>
            <CssBaseline enableColorScheme />
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
            {fetchingUser ? (
              <> </>
            ) : (
              <Routes>
                {getRoutes(routes)}
                <Route path='*' element={<Navigate to='/dashboard' replace />} />
              </Routes>
            )}
          </ThemeProvider>
        </CacheProvider>
      </QueryClientProvider>
    </AbilityContext.Provider>
  ) : (
    <AbilityContext.Provider value={ability}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkMode ? themeDark : theme}>
          <CssBaseline enableColorScheme />
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
            <Route path='*' element={<Navigate to='/dashboard' replace />} />
          </Routes>
        </ThemeProvider>
      </QueryClientProvider>
    </AbilityContext.Provider>
  );
}
