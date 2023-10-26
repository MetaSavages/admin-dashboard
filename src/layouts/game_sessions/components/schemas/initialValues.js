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

import checkout from 'layouts/game_sessions/components/schemas/form';

const {
  formField: { min_bet, max_bet }
} = checkout;
const initialValues = {
  [min_bet.name]: 0,
  [max_bet.name]: 0
};

export default initialValues;
