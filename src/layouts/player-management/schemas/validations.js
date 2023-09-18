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
import checkout from 'layouts/player-management/schemas/form';

const {
  formField: { nickname }
} = checkout;

const validations = [
  Yup.object().shape({
    [nickname.name]: Yup.string().required(nickname.errorMsg)
    .min(3, 'Nickname must have at least 3 characters')
    .max(500, 'Nickname must not exceed 500 characters')
  })
];

export default validations;
