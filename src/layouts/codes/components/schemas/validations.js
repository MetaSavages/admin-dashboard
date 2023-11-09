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
import checkout from './form';

const {
  formField: { count }
} = checkout;

const validations = Yup.object().shape({
  [count.name]: Yup.number().positive('Min Bet must be a positive number').required(`${count.errorMsg}`)
});

export default validations;
