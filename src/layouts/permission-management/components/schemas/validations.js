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
import checkout from 'layouts/permission-management/components/schemas/form';

const {
  formField: { action, object }
} = checkout;

const validations = Yup.object().shape({
  [action.name]: Yup.string().required(`${action.errorMsg}`),
  [object.name]: Yup.string().required(`${object.errorMsg}`)
});

export default validations;
