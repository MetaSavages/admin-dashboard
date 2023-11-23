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

const form = {
  formId: 'new-permission-form',
  formField: {
    action: {
      name: 'action',
      label: 'Action',
      type: 'select', 
      options: ['manage', 'create', 'read', 'update', 'delete'],
      errorMsg: 'Action is required.'
    },
    object: {
      name: 'object',
      label: 'Object',
      type: 'select', 
      options: ['all', 'user', 'role', 'permission', 'admin', 'casino', 'blacklist', 'metric', 'player', 'payout', 'deposit', 'support', 'reset-password-and-2fa'],
      errorMsg: 'Object is required.'
    }
  }
};

export default form;
