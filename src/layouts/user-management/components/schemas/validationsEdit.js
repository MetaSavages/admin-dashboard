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
import checkout from 'layouts/user-management/components/schemas/form';

const {
  formField: { firstName, lastName, email, password, repeatPassword, role }
} = checkout;

const validationsEdit = [
  Yup.object().shape({
    [firstName.name]: Yup.string().required(firstName.errorMsg),
    [lastName.name]: Yup.string().required(lastName.errorMsg),
    [email.name]: Yup.string().required(email.errorMsg).email(email.invalidMsg),
    [role.name]: Yup.mixed().required(role.errorMsg)
  })
];

export default validationsEdit;
