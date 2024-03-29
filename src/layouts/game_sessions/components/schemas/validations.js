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
import checkout from 'layouts/game_sessions/components/schemas/form';

const {
  formField: { min_bet, max_bet }
} = checkout;
console.log(Yup.ref(`${min_bet.name}`));
const validations = Yup.object().shape({
  [min_bet.name]: Yup.number().positive(min_bet.name.errorMsg).lessThan(Yup.ref('max_bet'), min_bet.name.errorMsgLess),
  [max_bet.name]: Yup.number().positive(max_bet.name.errorMsg).moreThan(Yup.ref('min_bet'), max_bet.name.errorMsgMore)
  // [
  //   Yup.number().required(`${min_bet.errorMsg}`),
  //   Yup.number().min(0, 'Min Bet must be greater than 0.')
  // ],
  // [
  //   Yup.number().required(`${max_bet.errorMsg}`),
  //   Yup.number().min(min_bet.name, 'Max Bet must be greater than Min Bet')
  // ]
});

export default validations;
