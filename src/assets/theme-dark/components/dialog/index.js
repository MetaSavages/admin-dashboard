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

// Material Dashboard 2 PRO React base styles
import borders from 'assets/theme-dark/base/borders';
import boxShadows from 'assets/theme-dark/base/boxShadows';
import colors from 'assets/theme-dark/base/colors';

import rgba from 'assets/theme-dark/functions/rgba';
const { borderRadius } = borders;
const { xxl } = boxShadows;
const { dark } = colors;
const dialog = {
  styleOverrides: {
    paper: {
      borderRadius: borderRadius.lg,
      boxShadow: xxl,
      backgroundColor: rgba(dark.main, 1)
    },

    paperFullScreen: {
      borderRadius: 0
    }
  }
};

export default dialog;
