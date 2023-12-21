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

const validations = [
    Yup.object().shape({
      [firstName.name]: Yup.string().required(firstName.errorMsg),
      [lastName.name]: Yup.string().required(lastName.errorMsg),
      [email.name]: Yup.string().required(email.errorMsg).email(email.invalidMsg),
      [role.name]: Yup.object().required(role.errorMsg),
      [password.name]: Yup.string().min(6, password.invalidMsg).nullable(), 
      [repeatPassword.name]: Yup.string().when(password.name, {
        is: (val) => val && val.length > 0, 
        then: Yup.string().required('Reset password is required when password is set').min(6, 'Reset password must be at least 6 characters'),
        otherwise: Yup.string().notRequired(), 
      }).oneOf([Yup.ref(password.name), null], repeatPassword.invalidMsg),
    }),
  ];  

  export default validations;
