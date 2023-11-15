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
  formId: 'new-role-form',
  formField: {
    roleName: {
      name: 'roleName',
      label: 'Role Name',
      type: 'text',
      errorMsg: 'Role name is required.'
    },
    rolePermissions: {
      name: 'rolePermissions',
      label: 'Role Permissions',
      type: 'select',
      errorMsg: 'Role permissions is required.'
    },
    casino: {
      name: 'casino',
      label: 'Casino',
      type: 'select',
      errorMsg: 'Casino is required.'
    }
  }
};

export default form;
