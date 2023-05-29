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
  formId: 'new-user-form',
  formField: {
    firstName: {
      name: 'firstName',
      label: 'First Name',
      type: 'text',
      errorMsg: 'First name is required.'
    },
    lastName: {
      name: 'lastName',
      label: 'Last Name',
      type: 'text',
      errorMsg: 'Last name is required.'
    },
    role: {
      name: 'role',
      label: 'Role',
      type: 'select',
      errorMsg: 'Role is required.'
    },
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
    },
    repeatPassword: {
      name: 'repeatPassword',
      label: 'Repeat Password',
      type: 'password',
      errorMsg: 'Password is required.',
      invalidMsg: "Your password doesn't match."
    }
  }
};

export default form;
