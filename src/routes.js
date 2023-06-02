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
import Logout from 'layouts/authentication/logout';
import ShowUser from 'layouts/user-management/show-user';
import PermissionManagement from 'layouts/permission-management';
import NewPermission from 'layouts/permission-management/new-permission';
import EditPermession from 'layouts/permission-management/edit-permission';
import EditRole from 'layouts/role-management/edit-role';
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
    // action: 'manage',
    // object: 'all',
    key: 'admin-management',
    icon: <Icon fontSize='medium'>manageAccounts</Icon>,
    collapse: [
      {
        name: 'User management',
        key: 'user-mangement',
        action: 'read',
        object: 'user',
        icon: <Icon fontSize='medium'>people</Icon>,
        route: '/user-management',
        component: <UserManagement />
      },
      {
        name: 'Role management',
        key: 'role-mangement',
        icon: <Icon fontSize='medium'>manageAccounts</Icon>,
        route: '/role-management',
        component: <RoleManagement />
      },
      {
        name: 'Permission management',
        key: 'permission-mangement',
        icon: <Icon fontSize='medium'>check_circle</Icon>,
        route: '/permission-management',
        component: <PermissionManagement />
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
    component: <PlayerManagement />
  },

  {
    type: 'collapse',
    name: 'Analytics',
    key: 'analytics',
    icon: <Icon fontSize='medium'>analytics</Icon>,
    collapse: [
      {
        name: 'Player Activity',
        key: 'player_activity',
        icon: <Icon fontSize='medium'>timeline</Icon>,
        route: '/analytics',
        component: <Analytics />
      },
      {
        name: 'Events',
        key: 'events',
        icon: <Icon fontSize='medium'>event</Icon>,
        route: '/events',
        component: <Analytics />
      }
    ]
  },
  {
    type: 'collapse',
    name: 'Casino',
    key: 'casino',
    icon: <Icon fontSize='medium'>casino</Icon>,
    route: '/casino',
    component: <Sales />
  },
  {
    type: 'collapse',
    name: 'Blacklists',
    key: 'blacklists',
    icon: <Icon fontSize='medium'>block</Icon>,
    route: '/blacklists',
    component: <Sales />
  },
  {
    type: 'collapse',
    name: 'Payouts',
    key: 'payouts',
    icon: <Icon fontSize='medium'>payments</Icon>,
    route: '/sales',
    component: <Sales />
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
    route: '/settings',
    component: <Sales />
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
    type: 'collapse',
    noCollapse: true,
    icon: <Icon fontSize='medium'>logout</Icon>,
    name: 'Logout',
    key: 'logout',
    route: '/authentication/logout',
    component: <Logout />
  }
];

export default routes;
