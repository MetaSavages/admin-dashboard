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
import checkout from 'layouts/baccarat-management/components/schemas/form';

const {
  formField: { casinoName, casinoProvider, minBet, maxBet }
} = checkout;

const validations = [
  Yup.object().shape({
    [minBet.name]: Yup.number().positive(minBet.errorMsg).lessThan(Yup.ref('maxBet'), minBet.errorMsgLess),
    [maxBet.name]: Yup.number().positive(maxBet.errorMsg).moreThan(Yup.ref('minBet'), maxBet.errorMsgMore)
  })
];

export default validations;
