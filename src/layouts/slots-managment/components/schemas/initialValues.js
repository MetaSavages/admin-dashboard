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

import checkout from 'layouts/slots-managment/components/schemas/form';

const {
  formField: { promoIndex, isUnreal }
} = checkout;
const initialValues = {
  [promoIndex.name]: 0,
  [isUnreal.name]: false,
};

export default initialValues;
