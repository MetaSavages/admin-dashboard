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

const form = {
  formId: 'login-user-form',
  formField: {
    email: {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      errorMsg: 'Email address is required.',
      invalidMsg: 'Your email address is invalid'
    },
    password: {
      name: 'password',
      label: 'Password',
      type: 'password',
      errorMsg: 'Password is required.',
      invalidMsg: 'Your password should be more than 6 characters.'
    }
  }
};

export default form;
