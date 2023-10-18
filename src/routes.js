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

/** 
  All of the routes for the Material Dashboard 2 PRO React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 PRO React layouts
import Analytics from 'layouts/player_activity';
import Sales from 'layouts/sales';
import NewUser from 'layouts/user-management/new-user';
import NewPlayer from 'layouts/player-management/new-player';

import SignInBasic from 'layouts/authentication/sign-in/basic';

// Material Dashboard 2 PRO React components

// @mui icons
import Icon from '@mui/material/Icon';

// Images
import PlayerManagement from 'layouts/player-management';
import UserManagement from 'layouts/user-management';
import RTL from 'layouts/pages/rtl';
import Dashboard from 'layouts/dashboard';
import RoleManagement from 'layouts/role-management';
import NewRole from 'layouts/role-management/new-role';
import EditUser from 'layouts/user-management/edit-user';
import EditPlayer from 'layouts/player-management/edit-player';
import ShowPlayer from 'layouts/player-management/show-player';
import Logout from 'layouts/authentication/logout';
import ShowUser from 'layouts/user-management/show-user';
import PermissionManagement from 'layouts/permission-management';
import NewPermission from 'layouts/permission-management/new-permission';
import EditPermession from 'layouts/permission-management/edit-permission';
import EditRole from 'layouts/role-management/edit-role';
import EventsAnalytics from 'layouts/events_analytics';
import PlayerActivity from 'layouts/player_activity';
import EventHistory from 'layouts/event_history';
import SuccessfullPayouts from 'layouts/payouts/successfull_payouts';
import FailedPayouts from 'layouts/payouts/failed_payouts';
import PendingPayouts from 'layouts/payouts/pending_payouts';
import SuccessfullDeposits from 'layouts/deposits/successfull_deposits';
import FailedDeposits from 'layouts/deposits/failed_deposits';
import PendingDeposits from 'layouts/deposits/pending_deposits';
import CasinoManagement from 'layouts/casinos';
import NewCasino from 'layouts/casinos/new-casino';
import EditCasino from 'layouts/casinos/edit-casino';
import Blacklists from 'layouts/blacklists';
import BaccaratManagement from 'layouts/baccarat-management';
import NewBaccaratTable from 'layouts/baccarat-management/components/new-baccarat-table';
import EditTable from 'layouts/baccarat-management/components/edit-table';
import BlackjackManagement from 'layouts/blackjack-management';
import EditBlackjackTable from 'layouts/blackjack-management/components/edit-table';
import NewBlackjackTable from 'layouts/blackjack-management/components/new-table';
import NewRouletteTable from 'layouts/roulette-management/components/new-table';
import EditRouletteTable from 'layouts/roulette-management/components/edit-table';
import RouletteManagement from 'layouts/roulette-management';
import Settings from 'layouts/pages/account/settings';
const routes = [
  { type: 'title', title: 'Home', key: 'title-home' },
  {
    type: 'collapse',
    noCollapse: true,
    name: 'Dashboard',
    key: 'dashboard',
    icon: <Icon fontSize='medium'>dashboard</Icon>,
    route: '/dashboard', //to be changed
    component: <Dashboard />
  },
  { type: 'title', title: 'Sections', key: 'title-sections' },
  {
    type: 'collapse',
    name: 'Admin management',
    // action: 'read',
    // object: 'admin', // not yet implemented in the backend
    key: 'admin-management',
    icon: <Icon fontSize='medium'>manageAccounts</Icon>,
    collapse: [
      {
        name: 'User management',
        key: 'user-management',
        action: 'read',
        object: 'user',
        icon: <Icon fontSize='medium'>people</Icon>,
        route: '/user-management',
        component: <UserManagement />
      },
      {
        name: 'Role management',
        key: 'role-management',
        icon: <Icon fontSize='medium'>manageAccounts</Icon>,
        route: '/role-management',
        component: <RoleManagement />,
        action: 'read',
        object: 'role'
      },
      {
        name: 'Permission management',
        key: 'permission-management',
        icon: <Icon fontSize='medium'>check_circle</Icon>,
        route: '/permission-management',
        component: <PermissionManagement />,
        action: 'read',
        object: 'permission'
      }
    ]
  },
  {
    type: 'collapse',
    noCollapse: true,
    name: 'Player management',
    key: 'player-management',
    icon: <Icon fontSize='medium'>people</Icon>,
    route: '/player-management',
    component: <PlayerManagement />,
    action: 'read',
    object: 'player'
  },
  {
    type: 'collapse',
    name: 'Analytics',
    key: 'analytics',
    icon: <Icon fontSize='medium'>analytics</Icon>,
    action: 'read',
    object: 'metric',
    collapse: [
      {
        name: 'Player Analytics',
        key: 'player-analytics',
        icon: <Icon fontSize='medium'>timeline</Icon>,
        route: '/analytics/player-analytics',
        component: <PlayerActivity />
      },
      {
        name: 'Events',
        key: 'events',
        icon: <Icon fontSize='medium'>event</Icon>,
        route: '/analytics/events',
        component: <EventsAnalytics />
      },
      {
        name: 'Event History',
        key: 'event-history',
        icon: <Icon fontSize='medium'>history</Icon>,
        route: '/analytics/event-history',
        component: <EventHistory />
      }
    ]
  },
  {
    type: 'collapse',
    noCollapse: true,
    name: 'Casinos',
    key: 'casinos',
    icon: <Icon fontSize='medium'>casino</Icon>,
    route: '/casinos',
    component: <CasinoManagement />,
    action: 'read',
    object: 'casino'
  },
  {
    type: 'collapse',
    name: 'Games',
    key: 'games',
    icon: <Icon fontSize='medium'>games</Icon>,
    collapse: [
      {
        name: 'Baccarat',
        key: 'baccarat-management',
        action: 'read',
        object: 'casino',
        icon: <Icon fontSize='medium'>smart_toy</Icon>,
        route: '/games/baccarat-management',
        component: <BaccaratManagement />
      },
      {
        name: 'Blackjack',
        key: 'blackjack-management',
        action: 'read',
        object: 'casino',
        icon: <Icon fontSize='medium'>extension</Icon>,
        route: '/games/blackjack-management',
        component: <BlackjackManagement />
      },
      {
        name: 'Roulette',
        key: 'roulette-management',
        icon: <Icon fontSize='medium'>sports_soccer</Icon>,
        route: '/games/roulette-management',
        component: <RouletteManagement />,
        action: 'read',
        object: 'casino'
      }
    ]
  },
  {
    type: 'collapse',
    name: 'Blacklists',
    key: 'blacklists',
    icon: <Icon fontSize='medium'>block</Icon>,
    noCollapse: true,
    route: '/blacklists/countries',
    component: <Blacklists />,
    action: 'read',
    object: 'blacklist'
  },
  {
    type: 'collapse',
    name: 'Deposits',
    key: 'deposits',
    icon: <Icon fontSize='medium'>add_card_payment</Icon>,
    action: 'read',
    object: 'deposit',
    collapse: [
      {
        name: 'Successful Deposits',
        key: 'successful-deposits',
        icon: <Icon fontSize='medium'>done</Icon>,
        route: '/deposits/successful-deposits',
        component: <SuccessfullDeposits />
      },
      {
        name: 'Failed Deposits',
        key: 'failed-deposits',
        icon: <Icon fontSize='medium'>clear</Icon>,
        route: '/deposits/failed-deposits',
        component: <FailedDeposits />
      },
      {
        name: 'Pending Deposits',
        key: 'pending-deposits',
        icon: <Icon fontSize='medium'>pending</Icon>,
        route: '/deposits/pending-deposits',
        component: <PendingDeposits />
      }
    ]
  },
  {
    type: 'collapse',
    name: 'Payouts',
    key: 'payouts',
    icon: <Icon fontSize='medium'>payments</Icon>,
    action: 'read',
    object: 'payout',
    collapse: [
      {
        name: 'Successful Payouts',
        key: 'successful-payouts',
        icon: <Icon fontSize='medium'>done</Icon>,
        route: '/payouts/successful-payouts',
        component: <SuccessfullPayouts />
      },
      {
        name: 'Failed Payouts',
        key: 'failed-payouts',
        icon: <Icon fontSize='medium'>clear</Icon>,
        route: '/payouts/failed-payouts',
        component: <FailedPayouts />
      },
      {
        name: 'Pending Payouts',
        key: 'pending-payouts',
        icon: <Icon fontSize='medium'>pending</Icon>,
        route: '/payouts/pending-payouts',
        component: <PendingPayouts />
      }
    ]
  },
  {
    type: 'collapse',
    noCollapse: true,
    name: 'Whitelists',
    key: 'whitelists',
    icon: <Icon fontSize='medium'>check_circle</Icon>,
    route: '/whitelists',
    component: <Sales />
  },
  {
    type: 'collapse',
    name: 'Tokenomics',
    key: 'tokenomics',
    icon: <Icon fontSize='medium'>monetization_on</Icon>,
    route: '/tokenomics',
    component: <Sales />
  },
  {
    type: 'collapse',
    noCollapse: true,
    name: 'Support Tickets',
    key: 'support-tickets',
    icon: <Icon fontSize='medium'>support</Icon>,
    route: '/support-tickets',
    component: <Sales />
  },
  {
    type: 'divider',
    key: 'divider-0'
  },
  {
    type: 'collapse',
    name: 'Settings',
    key: 'settings',
    icon: <Icon fontSize='medium'>settings</Icon>,
    collapse: [
      {
        name: 'Edit user',
        key: 'edit user',
        icon: <Icon fontSize='medium'>edit</Icon>,
        route: '/settings/user',
        component: <Settings />
      }
    ]
  },
  {
    type: 'collapse',
    noCollapse: true,
    name: 'Push Notifications',
    key: 'push-notifications',
    icon: <Icon fontSize='medium'>notifications</Icon>,
    route: '/push-notifications',
    component: <Sales />
  },
  {
    name: 'Sign In',
    key: 'sign-in',
    route: '/authentication/sign-in/basic',
    component: <SignInBasic />
  },
  {
    name: 'New User',
    key: 'new-user',
    route: '/user-management/new-user',
    component: <NewUser />
  },
  {
    name: 'Show User',
    key: 'show-user',
    route: '/user-management/show/:id',
    component: <ShowUser />
  },
  {
    name: 'Edit User',
    key: 'edit-user',
    route: '/user-management/edit/:id',
    component: <EditUser />
  },
  {
    name: 'New Player',
    key: 'new-player',
    route: '/player-management/new-player',
    component: <NewPlayer />
  },
  {
    name: 'Show Player',
    key: 'show-player',
    route: '/player-management/show/:id',
    component: <ShowPlayer />
  },
  {
    name: 'Edit Player',
    key: 'edit-player',
    route: '/player-management/edit/:id',
    component: <EditPlayer />
  },
  {
    name: 'New Role',
    key: 'new-role',
    route: '/role-management/new-role',
    component: <NewRole />
  },
  {
    name: 'Edit Role',
    key: 'edit-role',
    route: '/role-management/edit/:id',
    component: <EditRole />
  },
  {
    name: 'New Permission',
    key: 'new-permission',
    route: '/permission-management/new-permission',
    component: <NewPermission />
  },
  {
    name: 'Edit Permission',
    key: 'edit-permission',
    route: '/permission-management/edit/:id',
    component: <EditPermession />
  },
  {
    name: 'New Casino',
    key: 'new-casino',
    route: '/casinos/new-casino',
    component: <NewCasino />
  },
  {
    name: 'Edit Casino',
    key: 'edit-casino',
    route: '/casinos/edit/:id',
    component: <EditCasino />
  },
  {
    type: 'collapse',
    noCollapse: true,
    icon: <Icon fontSize='medium'>logout</Icon>,
    name: 'Logout',
    key: 'logout',
    route: '/authentication/logout',
    component: <Logout />
  },
  {
    name: 'New Baccarat table',
    key: 'new-baccarat-table',
    route: '/games/baccarat-management/new-baccarat-table',
    component: <NewBaccaratTable />
  },
  {
    name: 'Edit Baccarat table',
    key: 'edit-baccarat-table',
    route: '/games/baccarat-management/edit/:id',
    component: <EditTable />
  },
  {
    name: 'New Blackjack table',
    key: 'new-blackjack-table',
    route: '/games/blackjack-management/new-blackjack-table',
    component: <NewBlackjackTable />
  },
  {
    name: 'Edit Blackjack table',
    key: 'edit-blackjack-table',
    route: '/games/blackjack-management/edit/:id',
    component: <EditBlackjackTable />
  },
  {
    name: 'New Roulette table',
    key: 'new-roulette-table',
    route: '/games/roulette-management/new-roulette-table',
    component: <NewRouletteTable />
  },
  {
    name: 'Edit Roulette table',
    key: 'edit-roulette-table',
    route: '/games/roulette-management/edit/:id',
    component: <EditRouletteTable />
  }
];

export default routes;
