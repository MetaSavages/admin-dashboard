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
import checkout from 'layouts/email/components/schemas/form';

const {
  formField: { group }
} = checkout;

const validations = [
  Yup.object().shape({
    [group.name]: Yup.string()
      .required(group.errorMsg)
      .min(3, 'Group name must have at least 3 characters')
      .max(500, 'Group name must not exceed 500 characters')
  })
];

export default validations;
