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

import * as Yup from 'yup';
import checkout from 'layouts/role-management/schemas/form';

const {
  formField: { roleName, rolePermissions }
} = checkout;

const validations = [
  Yup.object().shape({
    [roleName.name]: Yup.string().required(`${roleName.errorMsg}`),
    [rolePermissions.name]: Yup.array().of(Yup.string()).min(1, `${rolePermissions.errorMsg}`)
  })
];

export default validations;
